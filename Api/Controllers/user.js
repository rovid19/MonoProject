import vehicleMake from "../Models/VehicleMake.js";
import vehicleModel from "../Models/VehicleModel.js";

export const addVehicle = async (req, res) => {
  const { plainJsVehicleObject } = req.body;
  try {
    const newVehicleMake = await vehicleMake.create({
      name: plainJsVehicleObject.vehicleName,
    });
    const newVehicleModel = await vehicleModel.create({
      name: plainJsVehicleObject.vehicleModel,
      yearMade: plainJsVehicleObject.vehicleYear,
      price: plainJsVehicleObject.vehiclePrice,
      makeId: newVehicleMake._id,
    });

    res.json(newVehicleModel);
  } catch (e) {
    console.log(e);
  }
};

export const getVehicles = async (req, res) => {
  const allVehicles = await vehicleModel.find().populate("makeId", "name");
  res.json(allVehicles);
};
