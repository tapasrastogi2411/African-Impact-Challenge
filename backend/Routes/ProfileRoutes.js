var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');


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

router.get('/login/', auth, function (req, res) {
    res.send('login'); // placeholder
});

router.put('/update/', auth, function (req, res) {
    // if (!req.session.username) return res.status(400).end("Forbidden");
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




module.exports = router;