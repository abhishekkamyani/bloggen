const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.FILE_CONTAINER_NAME);
const fs = require("fs");

const uploadFileOnAzure = (file, previousFileUrl) => {
    return new Promise((resolve, reject) => {
        const { filename, path, mimetype } = file;
        const blockBlobClient = containerClient.getBlockBlobClient(filename);

        const options = { blobHTTPHeaders: { blobContentType: mimetype } };

        blockBlobClient.uploadFile(path, options);
        const url = blockBlobClient.url;
        if (url) {
            // setTimeout(() => {
            //     resolve(url);
            // }, 30000);
            resolve(url);
        }
        else {
            reject({ error: "File not uploaded on cloud" })
        }

        setTimeout(() => {
            fs.unlink(path, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return;
                }
                console.log("File deleted successfully.");
            });
        }, 0.3 * 60 * 1000);

        if (previousFileUrl) {
            const prevName = previousFileUrl.substr(previousFileUrl.lastIndexOf("/") + 1);
            console.log(prevName);
            containerClient
                .deleteBlob(prevName)
                .then(() => {
                    console.log("Blob deleted successfully.");
                })
                .catch((error) => {
                    console.error("Error deleting blob:");
                });
        }

    })
}

module.exports = uploadFileOnAzure;