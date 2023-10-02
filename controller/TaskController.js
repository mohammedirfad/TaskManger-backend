import * as dotenv from 'dotenv';
dotenv.config();
import taskModel from '../models/taskModel.js';
import AsyncError from '../middleware/AsyncError.js'
import ErrorHandler from '../utils/ErrorHandlers.js'
import mongoose from 'mongoose';


export const createTask = AsyncError(async (req,res,next)=>{

    try{
        console.log(req.body,"ddddddddd", req.user.id.user._id);

        const newTask = new taskModel({
            title : req.body.title,
            user  : req.user.id.user._id
        })
        const savedTask  = await newTask.save();
        return res.status(200).json({message:"task added succesfully",savedTask})

    }
    catch(error){
        return next(new ErrorHandler(error.message,400));
    }
})


export const getCurrentUserTasks = AsyncError( async (req,res,next)=>{

    try{
        console.log("11");
        const tasks = await taskModel.find({user:req.user.id.user._id});
        console.log(tasks,"ss");
        return res.status(200).json({tasks});

    }
    catch(error){
        return next(new ErrorHandler(error.message,400));
    }
})

export const completeTodo = AsyncError( async (req,res,next)=>{

    try{
        console.log("11",req.body);
        const tasks = await taskModel.findOne({user:req.user.id.user._id ,_id:req.body.id});
        console.log(tasks.completed,"ss");
        tasks.completed = !tasks.completed;
        tasks.save();
        return res.status(200).json({tasks});

    }
    catch(error){
        return next(new ErrorHandler(error.message,400));
    }
})


export const DeleteTodo = AsyncError( async (req,res,next)=>{

    try{
        console.log("11",req.body);
        let ID = new mongoose.Types.ObjectId(req.body.id)
        const tasks = await taskModel.findByIdAndDelete({_id:ID});
        console.log(tasks,"snnjjs");
       
       
        return res.status(200).json({tasks});

    }
    catch(error){
        return next(new ErrorHandler(error.message,400));
    }
})