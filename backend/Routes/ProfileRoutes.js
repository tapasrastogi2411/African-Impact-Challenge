var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');


router.post('/register/', function (req, res, next) {
    var query = "INSERT INTO profile_schema.\"Company\"(company_id,name,address) VALUES (35,'J','K')";
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
    res.send('update'); // placeholder
});

router.delete('/delete/', auth, function (req, res) {
    res.send('delete'); // placeholder
});




module.exports = router;