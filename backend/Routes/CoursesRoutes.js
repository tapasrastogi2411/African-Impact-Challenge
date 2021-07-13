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
 * Get assignments and submission info associated with the assignments. Submission info pertains
 * to the currently logged-in user.
 * 
 */
router.get('/getAssignments', auth, async (req, res) => {
    try{
        //req.session.username = "Aaron"; //uncomment this for testing
        let query = "SELECT * " +
                    "FROM (post_schema.postfile pf join post_schema.postassignment pa on (pf.file_path=pa.file_path)) left outer join (select * " +
                                                                                                                "from post_schema.submitassignment sa " +
                                                                                                                " where sa.submission_user = $1) as sa2 on pa.file_path=sa2.assignment_file_path " +
                    "ORDER BY upload_date";

        const result = await db.query(query, [req.session.username]);
        //console.log(result.rows);
        // const filePaths = result.rows.map(row => row.file_path);
        var fileArray = result.rows;
        //console.log(fileArray);
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
    //req.session.username = "Aaron"; //uncomment this for testing
    //console.log("In upload route");
    //console.log(req.files);

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
            //console.log("File successfully uploaded.");
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
        //console.log("Assignment stored in PostAssignment");
        res.status(200).end();
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).end();
    })
});



/**
 * For simplicity, entrepreneur can make one submission per assignment
 * Most recent submission is stored
 * Allows for resubmission
 */
router.post('/upload/assignment/entrepreneur',  function (req, res) { 
    console.log("In entrepreneur route");
    let submissionPath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    let postedAssignment = JSON.parse(req.body.postedAssignment);
    let assignmentPath = postedAssignment.file_path;
    let currentdate = new Date(); 
    let datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

    console.log(submissionPath);
    console.log(assignmentPath);
    console.log(req.session.username);
    console.log("In entrepreneur route");

    let getUserPrevSubmission = "SELECT sa.submission_file_path as file_path FROM post_schema.submitassignment sa where sa.submission_user = $1 AND sa.assignment_file_path = $2  ";
    let deleteQuerySubmitAssignment = "DELETE FROM post_schema.submitassignment sa WHERE sa.submission_user = $1 AND sa.assignment_file_path = $2";
    let deleteQueryPostFile = "DELETE FROM post_schema.postfile pf WHERE pf.file_path = $1";
    let schema = "(submission_file_path, submission_user, assignment_file_path, submission_date)";
    let insertQuery = "INSERT INTO post_schema.submitassignment" + schema + " values ($1, $2, $3, $4)";

    var prevSubmissionFilePath;
    db.query(getUserPrevSubmission, [req.session.username, assignmentPath])
    .then(result => {
        if (result.rows[0]) {
            prevSubmissionFilePath = result.rows[0].file_path;
        } else {
            prevSubmissionFilePath = "";
        }
        console.log("In P1");
        console.log(prevSubmissionFilePath);
        return db.query(deleteQueryPostFile, [prevSubmissionFilePath])
    })
    .then(result => {
        console.log("Deleted submission stored in postfile");
        return db.query(insertQuery, [submissionPath, req.session.username, assignmentPath, datetime]);
    })
    .then(result => {
        console.log("Submitted assignment inserted in submitassignment");
        res.status(200).end();
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).end();
    })

    
});

module.exports = router;
