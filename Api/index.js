import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "../api/Routes/user.js";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(
  "mongodb+srv://Rock:rocketrocket@cluster0.fxdqshh.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use("/api/user", userRoute);
app.listen(port);
