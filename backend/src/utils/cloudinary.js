import { v2 as cloudinary} from 'cloudinary'
import { asyncHandler } from './asyncHandler.js'
import { ApiError } from './ApiError.js';
import fs from "fs";

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (imagePath) => {
    if (!imagePath) return null;

    // upload the photo
    try {
        const uploadedImage = await cloudinary.uploader.upload(imagePath, {
            resource_type : 'auto'
        })
        // console.log(uploadedImage);

        // remove image from local storage temp folder after uploading to cloud
        fs.unlinkSync(imagePath);

        return uploadedImage;
    } catch (error) {
        fs.unlinkSync(imagePath);
        throw new ApiError(501, `Cannot upload image: ${imagePath}`);
    }
}
export { uploadOnCloudinary }