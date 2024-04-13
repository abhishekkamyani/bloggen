const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop(); // Get the file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension);
    }
});


const upload = multer({
    limits: { fieldSize: 100 * 1024 * 1024 }, // Increase the field size limit to 100MB 
    storage: storage,
});
module.exports = upload;