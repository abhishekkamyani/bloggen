const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// exports.uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     //upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded successfull
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
//     console.log("cloud:" + error);
//     return null;
//   }
// };

// above and below are the same thing but we are using promise instead of async function

exports.uploadOnCloudinary = (localFilePath, prevUrl) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
          reject(error);
        } else {
          fs.unlinkSync(localFilePath);
          resolve(result);

          // delete the old Image if exists, actually this code is necessary for updating user profile. This code is not for uploading the blog post.
          if (prevUrl) {
            const publicId = prevUrl.substring(
              prevUrl.lastIndexOf("/") + 1,
              prevUrl.lastIndexOf(".")
            );
            cloudinary.uploader.destroy(publicId, (error, result) => {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
              }
            });
          }
        }
      }
    );
  });
};
