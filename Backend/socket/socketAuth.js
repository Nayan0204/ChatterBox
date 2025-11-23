import jwt from "jsonwebtoken";

export default async function socketAuth(socket, next) {
    try {
        const token = socket.handshake.auth?.token;
        if(!token) {
            return next(new Error("Unauthorized"));
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        socket.userId = decode.id;
        next();
    } catch (error) {
        console.log("Socket authentication error", error);
        next(new Error("Authentication error"));
    } 
    
}