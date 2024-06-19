const multer = require("multer");
const fs = require("fs");
const path = require("path");

const destination = path.join(__dirname, "../uploads");
console.log(destination);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, destination);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = file.originalname.split(".").pop(); // Get the file extension
//     cb(null, file.originalname + "-" + uniqueSuffix + "." + extension);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({
  limits: { fieldSize: 100 * 1024 * 1024 }, // Increase the field size limit to 100MB
  storage: storage,
});
module.exports = upload;
