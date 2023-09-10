import express from "express";
import { addVehicle } from "../Controllers/user.js";
const router = express.Router();

router.post("/add-vehicle", addVehicle);
export default router;
