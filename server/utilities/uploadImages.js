import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = async (image, opts) => {
  try {
    const result = await cloudinary.uploader.upload(image, opts);
    if (result && result.secure_url) {
      console.log(result.secure_url);
      return result.secure_url;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default uploadImage;
