const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./reports/"+req.body.dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

exports.upload = multer({
    storage: Storage
}).array("image", 12);