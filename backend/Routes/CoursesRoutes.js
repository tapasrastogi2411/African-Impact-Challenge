var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
const db = require('../db');
const path = require('path');
var upload = require('../upload.js');

// router.post('/user/postVideo', auth, upload.single('videos'), function (req, res) { 
//     console.log(req.file.path);
//     res.json({hi: 1231});
// });


module.exports = router;