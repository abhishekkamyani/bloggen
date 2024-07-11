const path = require("path");

// const destination = path.join(__dirname, "../uploads");

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


// const upload = multer({
//   limits: { fieldSize: 100 * 1024 * 1024 }, // Increase the field size limit to 100MB
//   storage: storage,
// });
// module.exports = upload;


const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multerS3 = require('multer-s3');

// Configure AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer to use S3 without ACL
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bloggen-bucket",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});


module.exports = upload;