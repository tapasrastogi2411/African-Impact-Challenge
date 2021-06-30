var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../upload.js');

router.post('/postVideo', auth, upload.single('videos'), function (req, res) { 
    console.log(req.file.path);

    // INSERT INTO post_schema.postfile VALUES ('uploads/assignments/hello.pdf', 1, '2021-06-22 18:50:40', 'Aaron Tan', 'hihi');

    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

    var postfileSchema = "(file_path, category, upload_date, upload_user, description)";
    var preparedValues = "($1,$2,$3,$4,$5)";
    var query = "INSERT INTO post_schema.postfile" + postfileSchema + " VALUES" + preparedValues;
    var values = [req.file.path, 1, datetime, 'as', 'sda']

    db
        .query(query, values)
        .then(res => {
            console.log("File successfully uploaded.")
        })
        .catch(e => console.error(e.stack))

    // res.json({hi: 1231});
});

router.post('/postReading', auth, upload.single('readings'), function (req, res) { 
    console.log(req.file.path);
    // res.json({hi: 1231});
});

router.post('/postAssignment', auth, upload.single('assignments'), function (req, res) { 
    console.log(req.file.path);
    // res.json({hi: 1231});
});


module.exports = router;