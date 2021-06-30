var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../upload.js');

//fields([{name:'readings'},{name: 'videos'}, {name:'assignments'}])

router.post('/upload', auth, upload.any(), function (req, res) { 
    req.session.username = "Aaron JACOB";
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

    var fieldName = req.files[0].fieldname;

    var category;
    if (fieldName === 'readings') {
        category = 1;
    } else if (fieldName === 'videos') {
        category = 2;
    } else if (fieldName === 'assignments') {
        category = 3;
    } 

    var postfileSchema = "(file_path, category, upload_date, upload_user, description)";
    var preparedValues = "($1,$2,$3,$4,$5)";
    var query = "INSERT INTO post_schema.postfile" + postfileSchema + " VALUES" + preparedValues;
    var values = [req.files[0].path, category, datetime, req.session.username, req.body.description]   

    db
        .query(query, values)
        .then(res => {
            console.log("File successfully uploaded.")
        })
        .catch(e => console.error(e.stack))

});

module.exports = router;