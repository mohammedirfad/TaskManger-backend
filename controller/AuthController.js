import * as dotenv from 'dotenv';
dotenv.config();
import { generateToken } from '../middleware/authVerify.js';
import userModel from '../models/userModel.js';
import AsyncError from '../middleware/AsyncError.js'
import ErrorHandler from '../utils/ErrorHandlers.js'
import { validateLogin, validateRegistration } from '../validation/userValidation.js';


//user-Registration


export const userRegistration = AsyncError(async (req,res,next)=>{
console.log(1);
    try{
console.log(123);
        console.log(req.body,";;;;;;;;;;;;;");
        const { error } = validateRegistration(req.body.Datas);
        const err={}
        if (error) {
            error.message=error.details[0].message
            error.statusCode=400
            return next(new ErrorHandler("please check your email and password",400))
        }

        const {name,email,password} = req.body;
        console.log(email);
        const isEmailExist = await userModel.findOne({email:email});
        console.log(isEmailExist,"llll");
        if(isEmailExist) {
            return res.status(400).json({message:"E-mail already exist"})
            return next(new ErrorHandler("E-mail already exist",400))
        };

        const user = new userModel({
            name,
            email,
            password
        })

        await user.save();
      
        res.status(201).json({ message: 'User registered successfully' });

    }
    catch(error){
        return next(new ErrorHandler(error.message,400))
    }

})

// user-Login :


export const userLogin = AsyncError(async (req,res,next)=>{

    try{
        
        const { error } = validateLogin(req.body.formData);
        console.log(error,"ddd");
        const err={}
        if (error) {
            error.message=error.details[0].message
            error.statusCode=400
           return next(error)
        }

        const {email , password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Please Enter email and password",400));
        }

        const user = await userModel.findOne({email: email}).select("+password");
        console.log(user);

        if(user === null){
            console.log("sdf");
            return res.status(400).json({message:"Invalid email and password"})
            const error = new ErrorHandler("Invalid email and password", 400);
            return next(error);
        }

        const isPasswordMatch = await user.comparePassword(password);
        
        if(!isPasswordMatch){
            console.log("here");
            return res.status(400).json({message:"Invalid email and passwords"})
            return next(new ErrorHandler("Invalid email and passwords  ",400));

        }

        const Token = generateToken({user});
        console.log(Token,"lll");
        res.status(200).json({ message: 'Login successful',user,Token });

    }
    catch(error){
        console.log(error,"llll");
        return next(new ErrorHandler(error.message,400))
    }
})


