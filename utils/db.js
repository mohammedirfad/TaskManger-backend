import { error } from 'console';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv as an ES6 module

// Load environment variables from .env file
dotenv.config();

 const dbUrl = process.env.DB_URI || "";

 export const connectDB = async () =>{
    try{
        await mongoose.connect(dbUrl).then((data)=>{
            console.log(`database connected ${data.connection.host}`);
            
        })
    }
    catch(err){
        console.log(err.message)
    }
 }