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


/**
 * Get assignments and upload info associated with the assignments
 *
 * SELECT *
 * FROM postfile pf join postassignment pa on pf.file_path=pa.file_path
 * ORDER BY upload_date 
 * 
 * 
 * All assignments and whether the currently logged-in user has submitted them
 * 
 * SELECT *
 * FROM (postfile pf join postassignment pa on (pf.file_path=pa.file_path)) left outer join (select *
 *                                                                                           from submitassignment sa
 *                                                                                           where sa.submission_user = $1) as sa2 on pa.file_path=sa2.assignment_file_path 
 * 
 * ORDER BY upload_date 
 * 
 * 
 */
router.get('/getAssignments', auth, async (req, res) => {
    try{
        req.session.username = "Aaron JACOB"; //uncomment this for testing
        let query = "SELECT * " +
                    "FROM (post_schema.postfile pf join post_schema.postassignment pa on (pf.file_path=pa.file_path)) left outer join (select * " +
                                                                                                                "from post_schema.submitassignment sa " +
                                                                                                                " where sa.submission_user = $1) as sa2 on pa.file_path=sa2.assignment_file_path " +
                    "ORDER BY upload_date";

        const result = await db.query(query, [req.session.username]);
        console.log(result.rows);
        // const filePaths = result.rows.map(row => row.file_path);
        var fileArray = result.rows;
        console.log(fileArray);
        for (obj of fileArray) {
            if (obj['description'] == "") {
                obj['description'] = "Description not provided";
            }
            if (obj['upload_user'] == "") {
                obj['upload_user'] = "Unknown";
            }
        }
       
        //console.log(fileArray);
        return res.status(200).json(fileArray);
    }

    catch(err){
        console.log(err)
        res.status(500).end('Server Error ...');
    }
});

router.use('/upload', auth, upload.any(), function (req, res, next) { 
    req.session.username = "Aaron JACOB"; //uncomment this for testing
    console.log("In upload route");
    console.log(req.files);

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
    var title = "";

    var category;
    if (fieldName === 'readings') {
        category = 1;
    } else if (fieldName === 'videos') {
        category = 2;
    } else if (fieldName === 'assignments') {
        category = 3;
        title = req.body.title
    } 

    var postfileSchema = "(file_path, category, upload_date, upload_user, title, description)";
    var preparedValues = "($1,$2,$3,$4,$5,$6)";
    var query = "INSERT INTO post_schema.postfile" + postfileSchema + " VALUES" + preparedValues;
    var values = [req.files[0].path.split(path.resolve(__dirname, '../')).pop(), category, datetime, req.session.username, title, req.body.description]   

    db
        .query(query, values)
        .then(result => {
            console.log("File successfully uploaded.");
            if (fieldName === 'assignments') {
                next();
            }
            res.status(200).end();
        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).end();
        })
});



router.post('/upload/assignment/teacher', function (req, res) { 
    let filePath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    let totalMarks = 0; // update when feature is implemented
    var query = "INSERT INTO post_schema.PostAssignment VALUES ($1, $2)";

    db.query(query, [filePath, totalMarks])
    .then(result => {
        console.log("Assignment stored in PostAssignment");
        res.status(200).end();
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).end();
    })
});


// include assignment url and submission url in the json body
router.post('/upload/assignment/entrepreneur',  function (req, res) { 
    console.log("In entrepreneur route");
    var assignmentPath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    var file_path = req.body.submission.file_path;
    // insert entry into db: SubmitAssignment
    console.log("Leaving entrepreneur route");
    res.status(200).json("");

});

module.exports = router;
