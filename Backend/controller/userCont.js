import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const registerCont = async (req,res) => {
    try {
        const {name, email , password} = req.body;
        if(!name || !email || !password){
          return  res.status(400).json({error: "Please fill all the fields"});
        }

        const user = await User.findOne({email});
        if(user) {
           return res.status(400).json({error: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({message: "User registered successfully"})
    }
    catch(error) {
        console.log("Error in registerCont", error);
        res.status(500).json({error: "Server error"});
    }
    
    }


    export const loginCont = async (req,res) => {
        
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({error: "Please fill all the fields"});
            }

            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({error: "User does not exist. Please register."});
            }

            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch) {
                return res.status(400).json({error: "Please enter corrrect password"});
            }

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn : "7d"});
            res.status(200).json({
                status: true,
                message: "User loggedin successfully",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    profilePic: user.profilePic,
                }
            })
        }
        catch(error) {
            console.log("Error in loginCont", error);
            res.status(500).json({error: "Server error"});
        }
    }

    export const getUserInfo = async (req,res) => {
        try {
           const user = await User.findById(req.user.id).select("-password");
           res.status(200).json({
            ok: true,
            user,
           });
        }
        catch(error) {
            console.log("Error in getUserInfo", error);
            res.status(500).json({error: "Server error"});
        }
    }

