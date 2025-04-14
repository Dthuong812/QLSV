const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingleFile = async (fileObject) => {
  try {
    // Upload ảnh lên Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "qlsv-tbkt/images", // Lưu vào folder trên Cloudinary
        resource_type: "image",
      },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    ).end(fileObject.data);

    return {
      status: "success",
      path: result.secure_url, // URL ảnh từ Cloudinary
      error: null,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      status: "failed",
      path: null,
      error: error.message,
    };
  }
};

module.exports = { uploadSingleFile };