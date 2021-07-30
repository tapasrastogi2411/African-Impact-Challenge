var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
var sendEmail = require('../NodeMailer/NodeMailer');
const db = require('../db');
const bcrypt = require("bcrypt"); 
const session = require('express-session');
const path = require('path');
const { send } = require('process');
const crypto = require('crypto');
var dateHelper = require('../Helper/dateHelper');

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

router.post('/createInvite/', auth, function (req, res, next) { // add auth after /createInvite for the final version
    
    var orderedValues = []; 

    // Sender information
    let sender = req.session.username // This changes to req.body.username for the final version
    
    // Setting the status variable 
    let status = 3;
    
    // Setting a time variable
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            
    // Putting everything in the orderedValues list
    orderedValues.push(sender); 
    orderedValues.push(req.body.receiver); // Pushing in the receiver from the front-end
    orderedValues.push(req.body.company_name); // Pushing in the company name from the front-end
    orderedValues.push(datetime);
    orderedValues.push(status);

    // Inserting into the Postgres DB
    var inviteExists = "SELECT * FROM profile_schema.invite WHERE sender=$1 AND receiver=$2";
    // db.query(inviteExists, [req.body['sender']], [req.body['receiver']])
    db.query(inviteExists, [sender, req.body.receiver])

    // Error and status 400 since invite already exists
    .then(pgRes => {
        if (pgRes.rowCount > 0) {
            res.status(400).json({err: "Invite request already sent"});

            // Adding this error to break the request since it becomes a duplicate otherwise
            throw new Error("Invite Request ALREADY exists!");
        }

        // Invite is not duplicate, insert it into the database
        var insertInvite = "INSERT INTO profile_schema.invite(sender, receiver, company, time, status) VALUES ($1,$2,$3,$4, $5)";
        return db.query(insertInvite, orderedValues);
    })
    .then(pgRes => {
        res.status(201).json({status: "Invite sent"});

    // Error checking messages    
    })
    .catch(err => {
        console.log(err.message);
        switch(err.message) {
            case "Invite request already sent":
                res.status(409).json("Invite request already sent");
                break;

            default:
                res.status(500).json({ error: err.message});
                break;
        }
    })
});
// Version 3 Try 3 - 636PM

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

/* Returns:
- A list of entrepreneur objects and a 200 status code upon successful execution of the query
- 500 status code if an error occured 

note: an instructor object is of the form
{
    username: '',
    password: '',
    user_role: X, <- where X is of type int
    honorifics: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    country: '',
    address: ''
} 
*/
router.get('/getEntrepreneurs', auth, async (req, res) => {
    try{
        let query = 'SELECT * FROM profile_schema.aic_user JOIN profile_schema.aic_role on user_role = role_id WHERE user_role=2'
        const result = await db.query(query);
        var userData = result.rows; 
        for (const obj of userData) {
            for (const key in obj) {
                if (obj[key] == 'null') {
                    obj[key] = "Not Provided"
                }
            }
        } 
      
        res.status(200).json(userData)
    }
    catch(err){
        // print the error and return a 500
        console.log(err)
        res.status(500).end('Server Error...')
    }
});


/* Returns:
- A list of instructor objects and a 200 status code upon successful execution of the query
- 500 status code if an error occured */
router.get('/getInstructors', auth, async(req,res) => {
    try{
        let query = 'SELECT * FROM profile_schema.aic_user JOIN profile_schema.aic_role on user_role = role_id WHERE user_role=1'
        const result = await db.query(query)
        var userData = result.rows; 
        for (const obj of userData) {
            for (const key in obj) {
                if (obj[key] == 'null') {
                    obj[key] = "Not Provided"
                }
            }
        } 
      
        res.status(200).json(userData)
    }
    catch(err){
        // print the error and return a 500
        console.log(err)
        res.status(500).end('Server Error...')
    }
});


/* Returns:
- A list of partner objects and a 200 status code upon successful execution of the query
- 500 status code if an error occured */
router.get('/getPartners', auth, async(req, res) => {
    try{
        let query = 'SELECT * FROM profile_schema.aic_user JOIN profile_schema.aic_role on user_role = role_id WHERE user_role=3'
        const result = await db.query(query)
        var userData = result.rows; 
        for (const obj of userData) {
            for (const key in obj) {
                if (obj[key] == 'null') {
                    obj[key] = "Not Provided"
                }
            }
        } 
        res.status(200).json(userData)
    }
    catch(err){
        // print the error and return a 500
        console.log(err)
        res.status(500).end('Server Error...')
    }
});


/* Returns:
- A list of startup objects and a 200 status code upon successful execution of the query
- 500 status code if an error occured */
router.get('/getStartups', auth, async(req, res) => {
    try{
        let query = 'SELECT * FROM profile_schema.company'
        const result = await db.query(query)
        var userData = result.rows; 
        for (const obj of userData) {
            for (const key in obj) {
                if (obj[key] == 'null') {
                    obj[key] = "Not Provided"
                }
            }
        } 
        
        res.status(200).json(userData)
    }
    catch(err){
        // print the error and return a 500
        console.log(err)
        res.status(500).end('Server Error...')
    }
})

router.patch('/acceptInvite', auth, function (req, res) {
    let preparedStatement = `UPDATE profile_schema.invite
                             SET status = 1
                             WHERE company = $1 and receiver = $2`;

    let inviteExist = "SELECT * FROM profile_schema.invite WHERE company = $1 and receiver = $2";
    
    // Get the receiver's username from session cookies
    if (!req.session.username) {
        return res.status(500).json("Username is null");
    } 
    let receiver = req.session.username;

    // Check whether the invite exists
    db.query(inviteExist, [req.body.company, receiver])
    .then(pgRes => {
        if (pgRes.rowCount == 0) {
            return res.status(404).json("The invite does not exist");
        }
        return db.query(preparedStatement, [req.body.company, receiver]);
    }) 
    .then(pgRes => {
        return db.query("INSERT INTO profile_schema.works_for (username, company_name) VALUES ($1, $2)", [receiver, req.body.company]);
    })
    .then(pgRes => {
        res.status(200).json("Invite Accepted");
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json("Internal Server Error")
    });
});

router.patch('/declineInvite', auth, function (req, res) {
    let preparedStatement = `UPDATE profile_schema.invite
                             SET status = 2
                             WHERE company = $1 and receiver = $2`;

    let inviteExist = "SELECT * FROM profile_schema.invite WHERE company = $1 and receiver = $2";
    
    // Get the receiver's username from session cookies
    if (!req.session.username) {
        return res.status(500).json("Username is null");
    } 
    let receiver = req.session.username;

    // Check whether the invite exists
    db.query(inviteExist, [req.body.company, receiver])
    .then(pgRes => {
        if (pgRes.rowCount == 0) {
            return res.status(404).json("The invite does not exist");
        }
        return db.query(preparedStatement, [req.body.company, receiver]);
    }) 
    .then(pgRes => {
        res.status(200).json("Invite Declined");

    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json("Internal Server Error");
    });
});

/* Returns:
- A list of invite objects sent by a currently logged in user.
    An invite object is of the form:

    {
        sender: sender_username
        receiver: receiver_username
        time: date_and_time
        status: 1/2/3, where 1 = Accepted, 2 = Declined, 3 = Pending
    }
*/
router.get('/fetchOutgoingInvites', auth, async(req, res) => {
    // get the sender's username (i.e the user currently logged in)
    let sender = req.session.username
    try{
        let query = `SELECT * FROM profile_schema.invite WHERE sender='${sender}'`
        const result = await db.query(query)
        res.status(200).json(result.rows)
    }
    catch(err){
        // print the error and return a 500
        console.log(err)
        res.status(500).end('Server Error...')
    }
})

/* Returns:
- A list of invite objects sent to the currently logged in user.
    An invite object is of the form:

    {
        sender: sender_username
        receiver: receiver_username
        time: date_and_time
        status: 1/2/3, where 1 = Accepted, 2 = Declined, 3 = Pending
    }
*/
router.get('/fetchIncomingInvites', auth, async(req, res) => {
    // get the receiver's username (i.e the user current logged in)
    let receiver = req.session.username
    try{
        // query for all pending invites only
        let query = `SELECT * FROM profile_schema.invite INNER JOIN profile_schema.company ON profile_schema.invite.receiver=profile_schema.company.creator WHERE receiver='${receiver}' AND status=3`
        const result = await db.query(query)
        res.status(200).json(result.rows)
    }
    catch(err){
        console.log(err)
        res.status(500).end('Server Error...')
    }
})

/* Returns: 
- A json object of the form:
{
    result: boolean
}
Where boolean = true, if the given username is associated with a company and false otherwise.
*/
router.get('/checkCompany/:username', auth, function(req, res) {
    let user = req.params.username;
    let query = "SELECT * FROM profile_schema.works_for WHERE username= $1"
    db
        .query(query, [user])
        .then(result => {
            if (!result.rows.length) { 
                return res.status(200).json({"result": false});
            }
            return res.status(200).json({"result": true});
        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).end();
        })
})

router.put('/forgotpassword', function(req, res) {
    var selectQuery = "SELECT first_name, last_name, email FROM profile_schema.aic_user WHERE username = $1";
    var username = req.body.username
    db
        .query(selectQuery, [username])
        .then(result => {
            if (!result.rows.length) {
                return res.status(400).json({err: "Username does not exist"});
            } 
            
            var deleteQuery = "DELETE FROM profile_schema.password_reset WHERE username = $1";
            db.query(deleteQuery, [username]).catch(e => {console.error(e.stack);res.status(500).json({err: "Server error"});});
            
            var resetCode = crypto.randomBytes(4).toString('hex');

            var mailOptions = {
                from: 'AfricanImpactChallengeTesting@gmail.com',
                to: `${result.rows[0].email}`,
                subject: 'African Impact Challenge Account Recovery Code: Expires in 10 minutes',
                html: `
                    <div style="width:50%">
                        <h2>The African Impact Challenge</h2>
                        <hr>
                    </div>
                    
                    <p>Hi, ${result.rows[0].first_name} ${result.rows[0].last_name}</p>
                    <p>We received a request to reset your African Impact Challenge account password.
                    Enter the following password reset code:</p>
                    
                    <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:max-content;margin-top:20px;margin-bottom:20px">
                        <tbody>
                            <tr>
                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:14px 32px 14px 32px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;text-align:center;border-radius:7px;display:block;border:1px solid #c48133;background:#ffa843">
                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                        <span style="color:white;font-size:17px;font-family:Roboto;font-weight:700;margin-left:0px;margin-right:0px">${resetCode}</span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                `
            };
            
            sendEmail(mailOptions);
            
            var password_reset_schema = "(username,recovery_code,expiry_date)";
            var preparedValues = "($1,$2,$3)";
            var insertQuery = "INSERT INTO profile_schema.password_reset" + password_reset_schema + " VALUES" + preparedValues;
            var userData = [username, resetCode, dateHelper.getExpiryDate(10)]
            return db.query(insertQuery, userData).then(result => {res.status(200).json({status: "Reset Code Sent"});}).catch(e => {console.error(e.stack);res.status(500).json({err: "Server error"});})   
        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).json({err: "Server error"});
        })
});

router.put('/resetpassword', function(req, res) {
    if(!req.body.resetCode) {
        return res.status(400).json({err: "Reset Code Not Provided"});
    }

    var selectQuery = "SELECT * FROM profile_schema.password_reset WHERE username = $1 and recovery_code = $2 and expiry_date > $3";

    db
        .query(selectQuery, [req.body.username, req.body.resetCode, dateHelper.getCurrentDate()])
        .then(result => {
            if (!result.rows.length) {
                return res.status(400).json({err: "Invalid Reset Code"});
            } 

            var updatePasswordQuery = "UPDATE profile_schema.aic_user SET password = $1 WHERE username = $2"
            
            bcrypt
                .genSalt(5)
                .then(salt => {
                    return bcrypt.hash(req.body.password, salt);
                })
                .then(hash => {
                    var newPW = hash;
                    db.query(updatePasswordQuery, [newPW, req.body.username])
                        .then(result => {
                            var deleteQuery = "DELETE FROM profile_schema.password_reset WHERE username = $1";
                            db.query(deleteQuery, [req.body.username]).catch(e => {console.error(e.stack);res.status(500).json({err: "Server error"});});
                            res.status(200).json({status: "Password Successfuly Updated"});})
                        .catch(e => {console.error(e.stack);res.status(500).json({err: "Server error"});})
                })

        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).json({err: "Server error"});
        })
});

router.post('/getCompanyMembers', function (req, res) { 
    var query = "SELECT username FROM profile_schema.works_for WHERE company_name = $1";

    db.query(query, [req.body.company_name])
    .then(result => {
        var members = result.rows.map(x => x.username);
        res.status(200).json({"members": members});
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).json({err: "Server error"});
    })
});

module.exports = router;