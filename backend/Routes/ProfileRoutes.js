var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
//const bcrypt = require("bcrypt"); // used for hashing and salting passwords


router.post('/register/', function (req, res, next) {

    var registerData = req.body;
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

    //console.log(invalidMandatoryFields);
    //console.log(invalidOptionalFields);
    //console.log(userData);

    if (invalidMandatoryFields.length > 0 ||  invalidOptionalFields.length > 0) {
        return res.status(400).json({err:"Invalid mandatory or optional fields", mandatory: invalidMandatoryFields,
        optional: invalidOptionalFields, data: userData});
    } 

    // all 10 fields are provided and they have the correct names

    var userSchema = "(username,password,user_role,honorifics,first_name,last_name,email,phone_number,country,address)";
    var preparedValues = "($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    var query = "INSERT INTO profile_schema.aic_user" + userSchema + " VALUES" + preparedValues;
    
    // hash and salt passwords
    db.query(query, userData)
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

router.get('/login/', auth, function (req, res) {
    res.send('login'); // placeholder
});


router.put('/update/', auth, function (req, res) {
    res.send('update'); // placeholder
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




module.exports = router;
