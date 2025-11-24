import express from 'express';
import { requiresignin } from '../middleware/auth.js';
import Message from '../models/message.js';
import User from '../models/user.js';
import socketAuth from '../socket/socketAuth.js';


const router  = express.Router();

router.get("/contacts", requiresignin, async (req, res) => {
  const users = await User.find({}, "_id name profilePic");
  res.json(users);
});

router.get("/:userId" , requiresignin , async (req, res) => {
    const you = req.user.id;
    const other = req.params.userId;

    const chat = await Message.find({
       $or : [{from:you , to: other},
         {from:other  , to: you}
        ],
    }).sort({createdAt: 1})

    res.json(chat);
} );







export default router;