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


module.exports = router;