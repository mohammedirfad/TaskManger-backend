import dotenv from 'dotenv';
dotenv.config();
import  express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { connectDB } from './utils/db.js';
import {ErrorHandle} from './middleware/Error.js';
import morgan from 'morgan';
import allRoutes from './routes/indexRoute.js'

const app= express();



app.use(express.json({limit:"50mb"}));
app.use(cookieparser());
app.use(morgan('tiny'));


app.use(cors());

app.use('/api',allRoutes);
// app.use("/aa/", userRoutes);
// app.use("/task/", taskRoutes);

app.use(ErrorHandle);

app.listen(process.env.PORT||8000,()=>{
    console.log("sever started @ "+process.env.PORT);
    connectDB();
})