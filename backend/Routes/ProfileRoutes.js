var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const session = require('express-session');
const path = require('path');


router.post('/register/', function (req, res, next) {
    var query = "INSERT INTO profile_schema.\"Company\"(company_id,name,address) VALUES (60,'B','F')";
    // uses JS promises
    db.query(query, [])
		.then(pgRes => {
            res.status(200).json('');
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: "Bad Query"});
        });
});

/* Status response codes:
400 = BadRequest - No user with the given user name
401 = Unauthorized - Incorrect password has been provided for the given username
200 = OK - Correct credentials have been provided */
router.post('/login/', auth, async function (req, res) {
    // check if user is already logged in
    if(req.session.loggedIn){
        res.status(200)
    }
    else{
        // get the password and username from the request object
        const { username, password } = req.body;
        // Checking the database to authenticate the user
        let query = `SELECT * FROM aic_user WHERE username='${username}'`
        const result = await db.query(query)
        // if the query returned no rows (i.e no user with the given username) return a 400
        if (result[0].length === 0){
            res.status(400)
        } else {
            // check if the passwords match (the passwords in the database have been hashed)
            const isMatch = await bcrypt.compare(password, result[0][0].password)
            // return a 401 if passwords dont match
            if(!isMatch){
                res.status(401)
            } else {
                // create a session and return a 200 response
                req.session.loggedIn = true
                req.session.username = username
                res.status(200)
            }
        }
    }
})


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