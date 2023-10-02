import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const emailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const UserSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: [true, "please enter your name"]
    },
    email: {
        type: 'string',
        required: [true, "please enter your email"],
        validate: {
            validator: function (value) {
                return emailValidate.test(value);
            },
            message: 'Please enter a valid email',

        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,

    },
   isVerified: {
        type: Boolean,
        default: false
    },
   

}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel =  mongoose.model("User", UserSchema);

export default userModel;