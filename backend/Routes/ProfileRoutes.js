var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const bcrypt = require("bcrypt"); 
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
    var mandatoryFields = ["username", "password", "user_role","first_name", "last_name"];
    var optionalFields = ["honorifics", "email", "phone_number", "country", "address"];
    var schemaOrder = ["username", "password", "user_role","honorifics","first_name", "last_name","email", "phone_number", "country", "address"];

    if (Object.values(registerData).length != 10) {
        return res.status(400).json({err: 'Should be 10 fields'});
    }

    var invalidMandatoryFields = []; 
    var invalidOptionalFields = []; 
    var userData = [];

    for (let i = 0; i < schemaOrder.length; i++) {
        var value = schemaOrder[i];

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
        userData[1] = hash;
        return db.query(query, userData);
    })
    .then(pgRes => { 
        return res.status(201).json(''); 
    })
    .catch(err => { 
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
        if (pgRes.rowCount > 0) { 
            var companyName = pgRes.rows[0].company_name;
            var companyDataQuery = "SELECT * FROM profile_schema.company WHERE company_name=$1";
            return db.query(companyDataQuery, [companyName]);
        }
        return res.status(404).json('');
    })
    .then(pgRes => { 
        var companyDataJson = pgRes.rows[0];
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
    var orderedValues = []; 
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
    
    orderedValues.push(req.session.username);
    
    var companyExists = "SELECT * FROM profile_schema.company WHERE company_name=$1";
    db.query(companyExists, [req.body['companyName']])
    .then(pgRes => {
        if (pgRes.rowCount > 0) {
            throw new Error("Company name already exists");
        }
        var insertCompany = "INSERT INTO profile_schema.company VALUES ($1,$2,$3,$4,$5,$6)";
        return db.query(insertCompany, orderedValues);
    })
    .then(pgRes => {
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

router.get('/getUser/', auth, function (req, res) {
    var userQuery = "SELECT * FROM profile_schema.aic_user WHERE username=$1";
    db.query(userQuery, [req.session.username])
    .then(pgRes => {
        if (pgRes.rowCount == 0) {
            throw new Error("Cannot find user");
        }
        var userData = pgRes.rows[0]; 
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
       
        return res.status(200).json(userData);
    })
    .catch(err => {
        console.log(err.message);
        switch(err.message) {
            case "Cannot find user":
                res.status(404).json({ error: "Cannot find user"});
                break;

            default:
                res.status(500).json({ error: err.message});
                break;
        }
    })
});

router.post('/login/', async function (req, res) {
    try {
        const { username, password } = req.body;
        let query = `SELECT * FROM profile_schema.aic_user WHERE username='${username}'`;
        const result = await db.query(query);

        if (result.rows.length === 0){
            return res.status(400).end('Invalid username');
        } else {
            const isMatch = await bcrypt.compare(password, result.rows[0].password);

            if(!isMatch){
                return res.status(401).end('Invalid password');
            } else {
                req.session.loggedIn = true;
                req.session.username = username;
                res.cookie('loggedIn', true, {sameSite: true});
                return res.status(200).json("");
            }
        }
        
    } catch (error) {
        console.log(error);
    }
        
})

router.put('/update/', auth, function (req, res) {
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
    db.query("DELETE FROM profile_schema.aic_user WHERE username = $1::text", ['Entrepreneur_1'])
		.then(pgRes => {
            res.status(200).json("Deletion Completed");
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: "Bad Query"});
        });
});

router.get('/logout', auth, function (req, res) { 
    req.session.destroy(function(err) {
        if(err) {
            return res.status(500).end(err);
        }
        return res.clearCookie('loggedIn').status(200).end();
    });
});

module.exports = router;
