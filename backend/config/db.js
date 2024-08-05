import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb://localhost/mydb');
    console.log('MongoDB Connected...');
}