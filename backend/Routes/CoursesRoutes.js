var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../upload.js');
const fileUpload = require('express-fileupload')

// router.post('/user/postVideo', auth, upload.single('videos'), function (req, res) { 
//     console.log(req.file.path);
//     res.json({hi: 1231});
// });

router.post('/upload', auth, (req, res) => {
    // if no file were uplaoded, return a 400 and an appropriate message
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded'})
    }

    // retrieve the file
    const file = req.files.file
    // get the type of the file from the request body
    const { type } = req.body

    // store the file in the uploads/type folder, where type is a variable = assignments, videos, or readings
    file.mv(`${__dirname}/backend/uploads/${type}/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }

        // add file to the database here

        // return a 200 for a successful operation, along with a json object containing the file name and path
        res.status(200).json({fileName: file.name, filePath: `uploads/${type}/${file.name}`})
    })
    
})


var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../Middleware/upload');

//fields([{name:'readings'},{name: 'videos'}, {name:'assignments'}])

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