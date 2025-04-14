const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadSingleFile = async (fileObject) => {
  try {
    const extName = path.extname(fileObject.name);
    const baseName = path.basename(fileObject.name, extName);
    const finalName = `images/${baseName}-${Date.now()}${extName}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: finalName,
      Body: fileObject.data,
      ContentType: fileObject.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${finalName}`;

    return {
      status: "success",
      path: fileUrl,
      error: null,
    };
  } catch (error) {
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

module.exports = { uploadSingleFile };