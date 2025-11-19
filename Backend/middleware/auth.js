import jwt from 'jsonwebtoken';

export const requiresignin = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({error: "Unauthorized"});
        }

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(error) {
        console.log("Error in requiresignin middleware", error);
        return res.status(500).json({error: "Server error"});
    }
}