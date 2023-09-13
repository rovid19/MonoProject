import express from "express";
import {
  addVehicle,
  deleteVehicle,
  editVehicle,
  getVehicleById,
  getVehicles,
} from "../Controllers/user.js";
const router = express.Router();

router.post("/add-vehicle", addVehicle);
router.get("/get-vehicles", getVehicles);
router.delete("/delete-vehicle", deleteVehicle);
router.get("/get-vehicle-by-id/:vehicleId", getVehicleById);
router.put("/edit-vehicle", editVehicle);
export default router;
