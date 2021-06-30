const path = require('path');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var destinationPath = path.resolve(__dirname, '..') + '/uploads/';
        var fieldName = file.fieldname;

        if (fieldName === 'videos') { //videos should be label of input attribute
            destinationPath += 'videos/'
        } else if (fieldName === 'readings') {
            destinationPath += 'readings/'
        } else if (fieldName === 'assignments') {
            destinationPath += 'assignments/'
        } 
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    var fieldName = file.fieldname;
    var fileTypes;

    if (fieldName === 'videos') { //videos should be label of input attribute
        fileTypes = /mp4/;    
    } else if (fieldName === 'readings') {
        fileTypes = /docx|doc|txt|pdf/;  
    } else if (fieldName === 'assignments') {
        fileTypes = /docx|doc|txt|pdf/;  
    } 

    var isValidFile = fileTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (!isValidFile) {
        return cb(new Error ('Only ' + fileTypes + ' are allowed'));
    }

    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;






