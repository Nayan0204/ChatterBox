import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import detailsRoute from "./routes/userDetails.js";

dotenv.config();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

app.use("/auth/api", authRoutes)
app.use("/user" , detailsRoute)

app.get("/", (req,res)=> {
    res.send("Server is running");
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



