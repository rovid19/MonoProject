import express from "express";
import {
  addVehicle,
  deleteVehicle,
  editVehicle,
  getVehicleById,
  getVehicles,
  uploadImage,
} from "../Controllers/user.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//multer destinacija za slike
const photosMiddleware = multer({ dest: path.join(__dirname, "../uploads") });

const router = express.Router();
router.post(
  "/upload-vehicle-picture",
  photosMiddleware.array("photo", 100),
  uploadImage
);
router.post("/add-vehicle", addVehicle);
router.get("/get-vehicles", getVehicles);
router.delete("/delete-vehicle", deleteVehicle);
router.get("/get-vehicle-by-id/:vehicleId", getVehicleById);
router.put("/edit-vehicle", editVehicle);
export default router;
