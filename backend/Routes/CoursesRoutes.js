var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../Middleware/upload');


// Route for gettings the `Readings`
router.get('/getReadings', auth, async (req, res) => {
    try{

        let query = `SELECT file_path FROM post_schema.postfile WHERE category=1 ORDER BY upload_date DESC`;
        const result = await db.query(query);
        const filePaths = result.rows.map(row => row.file_path);
        return res.status(200).json({file_paths: filePaths});
    }

    catch(err){
        console.log(err)
        res.status(500).end('Server Error ...');
    }
});

// Route for getting the `Videos`
router.get('/getVideos', auth, async (req, res) => {
    try{

        let query = `SELECT file_path FROM post_schema.postfile WHERE category=2 ORDER BY upload_date DESC`;
        const result = await db.query(query);
        const filePaths = result.rows.map(row => row.file_path);
        return res.status(200).json({file_paths: filePaths});
    }

    catch(err){
        console.log(err)
        res.status(500).end('Server Error ...');
    }
});

// Route for getting the `Assignments`
router.get('/getAssignments', auth, async (req, res) => {
    try{

        let query = `SELECT file_path FROM post_schema.postfile WHERE category=3 ORDER BY upload_date DESC`;
        const result = await db.query(query);
        const filePaths = result.rows.map(row => row.file_path);
        return res.status(200).json({file_paths: filePaths});
    }

    catch(err){
        console.log(err)
        res.status(500).end('Server Error ...');
    }
});

router.post('/upload', auth, upload.any(), function (req, res) { 
    // req.session.username = "Aaron JACOB"; //uncomment this for testing

    if(req.files.length === 0) {
        return res.status(400).end();
    };

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
    var values = [req.files[0].path.split(path.resolve(__dirname, '../')).pop(), category, datetime, req.session.username, req.body.description]   

    db
        .query(query, values)
        .then(result => {
            console.log("File successfully uploaded.")
            res.status(200).end();
        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).end();
        })
});

module.exports = router;
