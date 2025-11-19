import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";

dotenv.config();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectDB();

app.use("/auth/api", authRoutes)

app.get("/", (req,res)=> {
    res.send("Server is running");
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



