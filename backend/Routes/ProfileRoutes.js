var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const bcrypt = require("bcrypt"); // used for hashing and salting passwords
const session = require('express-session');
const path = require('path');


/*
* HTTP Status codes used:
* 201 -> Created, 
* 400 -> Bad Request, 409 -> Resource Conflict, 
* 500 -> Server Error
*
*/
router.post('/register/', function (req, res, next) {

    var registerData = req.body;
    //console.log(registerData);
    var mandatoryFields = ["username", "password", "user_role","first_name", "last_name"];
    var optionalFields = ["honorifics", "email", "phone_number", "country", "address"];
    var schemaOrder = ["username", "password", "user_role","honorifics","first_name", "last_name","email", "phone_number", "country", "address"];
    // first check for malformed input
    if (Object.values(registerData).length != 10) {
        return res.status(400).json({err: 'Should be 10 fields'});
    }

    var invalidMandatoryFields = []; 
    var invalidOptionalFields = []; 
    var userData = [];

    for (let i = 0; i < schemaOrder.length; i++) {
        var value = schemaOrder[i];
        // console.log(value);
        if (mandatoryFields.includes(value)){
            if (!(value in registerData)){
                invalidMandatoryFields.push(value);
            } else {
                userData.push(registerData[value]);
            }
        } 
        if (optionalFields.includes(value)) {
            if (!(value in registerData)){
                invalidOptionalFields.push(value);
            }
            else if (registerData[value] == '') {
                userData.push('null');
            } else {
                userData.push(registerData[value]);
            }
        }
    }

    if (invalidMandatoryFields.length > 0 ||  invalidOptionalFields.length > 0) {
        return res.status(400).json({err:"Invalid mandatory or optional fields", mandatory: invalidMandatoryFields,
        optional: invalidOptionalFields, data: userData});
    } 

    // all 10 fields are provided and they have the correct names
    //console.log(userData[2]);
    userData[2] = parseInt(userData[2]);

    var userSchema = "(username,password,user_role,honorifics,first_name,last_name,email,phone_number,country,address)";
    var preparedValues = "($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    var query = "INSERT INTO profile_schema.aic_user" + userSchema + " VALUES" + preparedValues;

    bcrypt
    .genSalt(5)
    .then(salt => {
        return bcrypt.hash(registerData['password'], salt);
    })
    .then(hash => {
        // Store hash in DB
        userData[1] = hash; // 2nd value in userData is password
        return db.query(query, userData);
    })
    .then(pgRes => { // user successfully added to the db
        //console.log(pgRes);
        return res.status(201).json(''); // 201 Created. Any payload to send to the client?
    })
    .catch(err => { // user already exists or some other db error
        switch (err.message){
            case "duplicate key value violates unique constraint \"aic_user_pkey\"":
                return res.status(409).json({ err: 'Username already exists'}); 
            case "insert or update on table \"aic_user\" violates foreign key constraint \"aic_user_user_role_fkey\"":
                return res.status(400).json({ err: 'Invalid role'}); 
            default:
                console.log(err.message);
                return res.status(500).json({ err: "Query error"});  
        }
    });
});


router.get('/inCompany/', auth, function (req, res, next) {

    var inCompany = "SELECT * FROM profile_schema.works_for WHERE username=$1";
    db.query(inCompany, [req.session.username])
    .then(pgRes => {
        if (pgRes.rowCount > 0) {
            return res.status(200).json('');
        }
        return res.status(404).json('');
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json('');
    });
    
});

router.get('/getCompany/', auth, function (req, res, next) {

    var inCompany = "SELECT * FROM profile_schema.works_for WHERE username=$1";
    db.query(inCompany, [req.session.username])
    .then(pgRes => {
        if (pgRes.rowCount > 0) { // get company data
            var companyName = pgRes.rows[0].company_name;
            var companyDataQuery = "SELECT * FROM profile_schema.company WHERE company_name=$1";
            return db.query(companyDataQuery, [companyName]);
        }
        return res.status(404).json('');
    })
    .then(pgRes => { // extract company data and send to client
        var companyDataJson = pgRes.rows[0];
        // companyDataJson["industry"] = value;
        for (var key in companyDataJson) {
            
            var value = companyDataJson[key];
            if (value == "null") {
                companyDataJson[key] = "Not Provided";
            } 
                
        }
        return res.status(200).json(companyDataJson);
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json('');
    });
});

router.post('/createCompany/', auth, function (req, res, next) {
    
    var orderedFields = ["companyName", "companyAddress", "industry", "size", "about"];
    var orderedValues = []; // values to be inserted into db
    for (var key of orderedFields) {
        var value = req.body[key];
        if (value == "") {
            orderedValues.push("null");
        } else {
            orderedValues.push(value);
        }
    }
    
    if (!req.session.username) {
        return res.status(500).json("Username is null");
    } 
    console.log(req.session.username);
    orderedValues.push(req.session.username);
    console.log(orderedFields);
    console.log(orderedValues);

    
    var companyExists = "SELECT * FROM profile_schema.company WHERE company_name=$1";
    // first check if the company already exists in the db
    db.query(companyExists, [req.body['companyName']])
    .then(pgRes => {
        if (pgRes.rowCount > 0) {
            throw new Error("Company name already exists");
        }
        // add the company to the db
        var insertCompany = "INSERT INTO profile_schema.company VALUES ($1,$2,$3,$4,$5,$6)";
        return db.query(insertCompany, orderedValues);
    })
    .then(pgRes => {
        // add username,company to works_for
        var worksFor = "INSERT INTO profile_schema.works_for VALUES($1,$2)";
        return db.query(worksFor, [req.session.username, req.body['companyName']]);
    })
    .then(pgRes => {
        res.status(201).json("Company added");

    })
    .catch(err => {
        console.log(err.message);
        switch(err.message) {
            case "Company name already exists":
                res.status(409).json("Company name already exists");
                break;

            default:
                res.status(500).json({ error: err.message});
                break;
        }

    })

});

/* Status response codes:
400 = BadRequest - No user with the given user name
401 = Unauthorized - Incorrect password has been provided for the given username
200 = OK - Correct credentials have been provided */
router.post('/login/', auth, async function (req, res) {
    // // check if user is already logged in
    // if(req.session.loggedIn){
    //     res.status(200)
    // }
    // else{

        try {
            // get the password and username from the request object
            const { username, password } = req.body;
            // Checking the database to authenticate the user
            let query = `SELECT * FROM profile_schema.aic_user WHERE username='${username}'`
            const result = await db.query(query)
            // if the query returned no rows (i.e no user with the given username) return a 400
            if (result.rows.length === 0){
                return res.status(400).end('Invalid username')
            } else {
                // check if the passwords match (the passwords in the database have been hashed)
                const isMatch = await bcrypt.compare(password, result.rows[0].password)
                // return a 401 if passwords dont match
                if(!isMatch){
                    return res.status(401).end('Invalid password')
                } else {
                    // create a session and return a 200 response
                    req.session.loggedIn = true
                    req.session.username = username
                    console.log(req.session.id);
                    var userData = result.rows[0]; // prevent password from getting sent (although it's hashed+salted)
                    // console.log(req.session);
                    console.log(userData);
                    if (userData["user_role"] == 1) {
                        userData["user_role"] = "Teacher";
                    } else if (userData["user_role"] == 2) {
                        userData["user_role"] = "Entrepreneur";
                    } else {
                        userData["user_role"] = "Partner";
                    }

                    for (const property in userData) {
                        if (userData[property] == 'null') {
                            userData[property] = "Not Provided";
                        }
                    }
                    delete userData["password"];
                    console.log(userData);
                    return res.status(200).json(userData);
                }
            }
            
        } catch (error) {
            console.log(error);
        }
        
    // }
})

router.put('/update/', auth, function (req, res) {
    if (!req.session.username) return res.status(400).end("Forbidden");
    var whitelist = ["first_name", "last_name", "email", "phone_number", "country", "address"];
    var data = JSON.parse(JSON.stringify(req.body, whitelist));
    var updateString = Object.keys(data).map(key => `${key} = '${data[key]}'`).join(", ");

    let query = `UPDATE profile_schema.aic_user
                 SET ${updateString}
                 WHERE username = '${req.body.username}'`;

        db.query(query, [])
        .then(pgRes => {
            res.status(200).json('');
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).end("Bad Query: Unable to update profile");
        });
});

router.delete('/delete/', auth, function (req, res) {
    // uses JS promises
    db.query("DELETE FROM profile_schema.aic_user WHERE username = $1::text", ['Entrepreneur_1'])
		.then(pgRes => {
            res.status(200).json("Deletion Completed");
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: "Bad Query"});
        });
});

// (Added by Tapas) - For the API Logout Request
router.get('/logout', auth, function (req, res) { 
    req.session.destroy(function(err) {
        if(err) return res.status(500).end(err);
        return res.end();
    });

});


module.exports = router;
