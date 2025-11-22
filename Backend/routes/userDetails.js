import express from 'express';
import {getUserInfo, loginCont, registerCont } from '../controller/userCont.js';
import { requiresignin } from '../middleware/auth.js';
import updateProfileCont from '../controller/details.js';

const router  = express.Router();

router.put("/updateprofile", requiresignin , updateProfileCont)




export default router;