const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

console.log("IN AWS MIDDLEWARE");
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_KEY);
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4',
    region: 'ca-central-1',
});

const S3 = new AWS.S3();
module.exports = S3;

const fileFilter = function (req, file, cb) {
    var fieldName = file.fieldname;
    var fileTypes;
    

    if (fieldName === 'videos') { //videos should be label of input attribute
        fileTypes = /mp4/;    
    } else if (fieldName === 'readings') {
        fileTypes = /docx|doc|txt|pdf/;  
    } else if (fieldName === 'assignments') {
        fileTypes = /docx|doc|txt|pdf/;  
    } else if (fieldName === 'company') {
        fileTypes = /docx|doc|txt|pdf/;  
    } 

    var isValidFile = fileTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (!isValidFile) {
        return cb(new Error ('Only ' + fileTypes + ' are allowed'));
    }

    cb(null, true);
};

let upload = multer({
    fileFilter,
    storage: multerS3({
        s3: S3,
        bucket: 'aic-assets',
        acl: 'public-read',
        //contentType: multerS3.AUTO_CONTENT_TYPE,
        contentType: function (req, file, cb) {
            cb(null, 'text/plain');
        },
        key: function (req, file, cb) {
            console.log("IN MULTER CB");
            console.log(multerS3.AUTO_CONTENT_TYPE);
            var filePath = 'uploads/';
            var fieldName = file.fieldname;
            var fileName = Date.now() + "_" + file.originalname;
          

            if (fieldName === 'videos') { //videos should be label of input attribute
                filePath += 'videos/'
            } else if (fieldName === 'readings') {
                filePath += 'readings/'
            } else if (fieldName === 'assignments') {
                filePath += 'assignments/'
            } else if (fieldName === 'company') {
                filePath += 'company/'
            } 
            filePath += fileName;
            

            cb(null, filePath);

        },
        
    })
});

module.exports = upload;


