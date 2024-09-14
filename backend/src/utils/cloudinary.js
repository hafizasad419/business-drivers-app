import fs from "fs"
import cloudinary from "cloudinary"
import { configDotenv } from "dotenv";
configDotenv()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  

const uploadOnCloudinary = async (localFilePath) => {
    // console.log("Uploading file from path:", localFilePath); 
    // Log the path
    try {
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" }, );
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error); // Log any errors
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary }
