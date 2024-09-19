import express from "express"
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import connectedDB from "./DB/connection.js";
import { appRouter } from "./Src/modules/index.route.js";
const _dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(_dirname, './config/.env') })



const app = express()
const port =process.env.PORT || 5000 
app.use(express.json())

connectedDB()
appRouter(app)

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})