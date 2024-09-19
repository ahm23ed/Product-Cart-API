import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../config/.env') })
import { config, v2 as cloudinary } from 'cloudinary';


config({
    cloud_Name:  process .env.cloud_name,
    API_key:process.env.api_key,
        api_secret:process.env.API_secret,
        secure: true
});

export default cloudinary