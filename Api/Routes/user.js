import express from "express";
import { addVehicle, deleteVehicle, getVehicles } from "../Controllers/user.js";
const router = express.Router();

router.post("/add-vehicle", addVehicle);
router.get("/get-vehicles", getVehicles);
router.delete("/delete-vehicle", deleteVehicle);
export default router;
