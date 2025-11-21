import multer from "multer";
import { cloudinary } from "./cloudnary.js"; 

// Use memory storage so file is kept in memory buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = async (fileBuffer, folder, filename) => {
  try {
    // Wrap upload_stream in a Promise
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: filename,
          resource_type: "auto", 
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      // End the stream by writing the buffer
      stream.end(fileBuffer);
    });

    return result; 
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export { upload, uploadToCloudinary };