const {BlobServiceClient} = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.CONTENT_CONTAINER_NAME);

const uploadContentOnAzure = (content, name) => {
    return new Promise((resolve, reject) => {
        const blockBlobClient = containerClient.getBlockBlobClient(name);
        const options = { blobHTTPHeaders: { blobContentType: "text/html" } };

        const result = blockBlobClient.upload(content, content.length, options);
        console.log(result);
        const url = blockBlobClient.url;
        console.log(url);
        resolve(url);
    })
}

module.exports = uploadContentOnAzure;