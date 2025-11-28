import cloudinary from "../config/cloudinary.js";
import User from "../models/user.js";

export const uploadProfilePic = async (req,res) => {
    try {
        const userId = req.user.id;

        if(req.body.imageUrl){
            const updateUser = await User.findByIdAndUpdate(userId,
                {profilePic: req.body.imageUrl},
                {new: true}
            )
            return res.status(200).json({
                ok: true,
                message: "Profile pic updated",
                user: updateUser
            })
        }
        
        if(!req.file){
            return res.status(400).json({error: "Please upload a profile picture."})
        }

        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_pictures",
        })

        const updateUser = await User.findByIdAndUpdate(userId,
            {profilePic: uploadImage.secure_url},
            {new: true},
        )
        res.status(200).json({
            ok: true,
            message: "Profile picture updated",
            user: updateUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "backend error"})
    }  

}

export const updateBioCont = async (req,res) => {
    try{
       const userId = req.user.id;
       const {bio} = req.body;

       if(!bio){
        return res.status(400).json({error: "Bio not provided"});
       }

       const updateUser = await User.findByIdAndUpdate(userId,
        {bio: bio},
        {new: true},
       )
       res.status(200).json({
        ok: true,
        message: "Bio updated successfully",
        user: updateUser,
       })
    }
    catch(error){
        console.log(error)
    }
}