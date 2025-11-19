import express from 'express';
import {getUserInfo, loginCont, registerCont } from '../controller/userCont.js';
import { requiresignin } from '../middleware/auth.js';

const router  = express.Router();

router.post("/register", registerCont);
router.post("/login", loginCont);
router.get("/profile", requiresignin , getUserInfo);

export default router;