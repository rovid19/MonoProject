import express from "express";
import { addVehicle, getVehicles } from "../Controllers/user.js";
const router = express.Router();

router.post("/add-vehicle", addVehicle);
router.get("/get-vehicles", getVehicles);
export default router;
