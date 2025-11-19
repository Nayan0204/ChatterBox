import mongoose from "mongoose";

export const connectDB = async() => {
    const uri = process.env.MONGODB_URL;
    try {
        await mongoose.connect(uri);
        console.log("MongoDB cconnected succesfully");
    }
    catch(error){
        console.log("Error while connecting to MongoDB", error);
    }
}

export default connectDB;