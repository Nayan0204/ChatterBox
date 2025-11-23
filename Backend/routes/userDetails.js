import express from 'express';
import { requiresignin } from '../middleware/auth.js';
import  { uploadProfilePic,updateBioCont } from '../controller/details.js';
import upload from '../middleware/multer.js';

const router  = express.Router();

router.put("/updateprofile", requiresignin ,upload.single("image"), uploadProfilePic);
router.put("/updateBio" , requiresignin , updateBioCont );




export default router;