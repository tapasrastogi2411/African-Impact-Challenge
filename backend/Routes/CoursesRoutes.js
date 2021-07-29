var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../Middleware/upload');
var upload = require('../Middleware/upload-aws');
if (process.env.NODE_ENV === "production") {
    upload = require('../Middleware/upload-aws');
}

router.get('/getReadings', async (req, res) => {
    try{
        let query = `SELECT * FROM post_schema.postfile WHERE category=1 ORDER BY upload_date DESC`;
        const result = await db.query(query);
        var fileArray = result.rows;

        for (obj of fileArray) {
            if (obj['description'] == "") {
                obj['description'] = "Description not provided";
            }
            if (obj['upload_user'] == "") {
                obj['upload_user'] = "Unknown";
            }
        }
        return res.status(200).json(fileArray);
    }
    catch(err){
        console.log(err)
        res.status(500).end('Server Error ...');
    }
});

router.get('/getVideos', async (req, res) => {
    try{
        let query = `SELECT file_path, upload_user, title, upload_date FROM post_schema.postfile WHERE category=2 ORDER BY upload_date DESC`;
        const result = await db.query(query);
        var fileArray = result.rows;
        return res.status(200).json(fileArray);
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
        var fileArray = result.rows;
        for (obj of fileArray) {
            if (obj['description'] == "") {
                obj['description'] = "Description not provided";
            }
            if (obj['upload_user'] == "") {
                obj['upload_user'] = "Unknown";
            }
        }
       
        
        return res.status(200).json(fileArray);
    }

    catch(err){
        console.log(err)
        res.status(500).end('Server Error ...');
    }
});

/**
 * Get company files for the company the currently logged-in user works for
 */ 
router.get('/getCompanyFiles', function (req, res) { 
    // req.session.username="Agnes"
   
    let companyFilesView = `drop view if exists CompanyFiles; ` +
                        `create view CompanyFiles as (select cf.file_path ` +
                        `from (select company_name from profile_schema.works_for where username = '${req.session.username}' ) as cn ` +
                        `join post_schema.CompanyFile cf on (cn.company_name = cf.company_name));`;   

    let getFiles = "select * from CompanyFiles cf join post_schema.PostFile pf on (cf.file_path=pf.file_path)";    
    let dropView = "drop view CompanyFiles";         
    let files = [];

    db.query(companyFilesView, [])
    .then(pgRes => {
        return db.query(getFiles, []);
    })
    .then(pgRes => {
        pgRows = pgRes.rows;
        for (let file of pgRows) {
            files.push(file);
        }
        files = JSON.stringify(files);
        return db.query[dropView, []];
    })
    .then(pgRes => {
        return res.status(200).json(files);
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).end();
    });
});


router.use('/upload', auth, upload.any(), function (req, res, next) { 
    // req.session.username = "Aaron"; //uncomment this for testing
    console.log("in upload route");
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
    var title = "" || req.body.title;

    var category;
    if (fieldName === 'readings') {
        category = 1;
    } else if (fieldName === 'videos') {
        category = 2;
    } else if (fieldName === 'assignments') {
        category = 3;
    } else if (fieldName === 'company') {
        category = 4;
    } 

    var storePath = null;
    if (process.env.NODE_ENV === "production") {
        storePath = req.files[0].key;
        storePath = "/" + storePath; // prepend a slash since aws key does not include slash
    } else {
        storePath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    }

    var postfileSchema = "(file_path, category, upload_date, upload_user, title, description)";
    var preparedValues = "($1,$2,$3,$4,$5,$6)";
    var query = "INSERT INTO post_schema.postfile" + postfileSchema + " VALUES" + preparedValues;
    var values = [storePath, category, datetime, req.session.username, title, req.body.description]   

    db
        .query(query, values)
        .then(result => {
            if (fieldName === 'assignments' || fieldName === 'company') {
                next();
            }
            res.status(200).end();
        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).end();
        })
});


// upload is already authenticated so no need to reauthenticate
/**
 */
router.post('/upload/companyFile/', function (req, res) { 

    var filePath = null;
    if (process.env.NODE_ENV === "production") {
        filePath = req.files[0].key;
        filePath = "/" + filePath; // prepend a slash since aws key does not include slash
    } else {
        filePath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    }
    
    let companyNameQuery =  "select company_name " +
                            "from profile_schema.works_for " +
                            "where username=$1 ";

    let insertFile =  "INSERT INTO post_schema.CompanyFile VALUES ($1, $2)";
    db.query(companyNameQuery, [req.session.username])
    .then(pgRes => {
        let companyName = pgRes.rows[0].company_name;
        return db.query(insertFile, [companyName, filePath]);
    })
    .then(pgRes => {
        res.status(200).end();
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).end();
    });
                    
});





router.post('/upload/assignment/teacher', function (req, res) { 

    var filePath = null;
    if (process.env.NODE_ENV === "production") {
        filePath = req.files[0].key;
        filePath = "/" + filePath; // prepend a slash since aws key does not include slash
    } else {
        filePath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    }
   
    let totalMarks = req.body.totalMarks;
    let deadline = req.body.deadline.replace("T", " ");
    var query = "INSERT INTO post_schema.PostAssignment VALUES ($1, $2, $3)";

    

    db.query(query, [filePath, totalMarks, deadline])
    .then(result => {
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

    var submissionPath = null;
    if (process.env.NODE_ENV === "production") {
        submissionPath = req.files[0].key;
        submissionPath = "/" + submissionPath; // prepend a slash since aws key does not include slash
    } else {
        submissionPath = req.files[0].path.split(path.resolve(__dirname, '../')).pop();
    }
    
    let postedAssignment = JSON.parse(req.body.postedAssignment);
    let assignmentPath = postedAssignment.file_path;
    let currentdate = new Date(); 
    let datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

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
    
        return db.query(deleteQueryPostFile, [prevSubmissionFilePath])
    })
    .then(result => {
        return db.query(insertQuery, [submissionPath, req.session.username, assignmentPath, datetime]);
    })
    .then(result => {
        res.status(200).end();
    })
    .catch(e => {
        console.error(e.stack);
        res.status(500).end();
    })

    
});

module.exports = router;
