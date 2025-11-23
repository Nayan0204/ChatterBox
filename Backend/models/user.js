import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minLength: 6,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
     },
     friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     }],
     pendingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     }],
     sentRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     }],
})

const User = mongoose.model("User", userSchema);
export default User;