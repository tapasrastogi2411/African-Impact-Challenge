var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const session = require('express-session');
const path = require('path');


router.post('/register/:username', function (req, res, next) {
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

// Middleware
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}))

router.post('/login/', auth, function (req, res) {
    // check if user is already logged in
    if(req.session.loggedIn){
        res.status(200)
    }
    else{
        // get the password and username from the request object
        const { username, password } = req.body;
        // Checking the database to authenticate the user
        let query = `SELECT * FROM aic_user WHERE username='${username}' AND password='${password}'`
        db.query(query, (err, result) => {
            // return a 401 error if the query was unsuccessful
            if (err) {
                console.log(err)
                res.status(401)
            } else{
                // create a session and return a 200 response if the query was successful
                req.session.loggedIn = true
                req.session.username = username
                res.status(200)
            }
        })
    }
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