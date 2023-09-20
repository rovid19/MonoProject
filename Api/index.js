import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "../api/Routes/user.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use("/api/user", userRoute);
app.listen(port);
