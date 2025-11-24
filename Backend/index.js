import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import detailsRoute from "./routes/userDetails.js";
import http from "http";
import { Server } from "socket.io";
import socketAuth from "./socket/socketAuth.js";
import { messageCont } from "./socket/messageCont.js";
import { userCont } from "./socket/userCont.js";
import chatRoutes from "./routes/userChats.js";


dotenv.config();


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

io.use(socketAuth);

io.on("connection", (socket) => {
    messageCont(socket , io);
    userCont(socket , io);
})

app.use("/auth/api", authRoutes)
app.use("/user" , detailsRoute)

app.use("/chat" , chatRoutes)

app.get("/", (req,res)=> {
    res.send("Server is running");
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



