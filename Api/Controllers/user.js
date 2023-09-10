import vehicleMake from "../Models/VehicleMake.js";
import vehicleModel from "../Models/VehicleModel.js";

export const addVehicle = async (req, res) => {
  const { plainJsVehicleObject } = req.body;
  try {
    const newVehicleMake = await vehicleMake.create({
      Name: plainJsVehicleObject.vehicleName,
    });
    const newVehicleModel = await vehicleModel.create({
      Name: plainJsVehicleObject.vehicleModel,
      YearMade: plainJsVehicleObject.vehicleYear,
      Price: plainJsVehicleObject.vehiclePrice,
      MakeId: newVehicleMake._id,
    });

    res.json(newVehicleModel);
  } catch (e) {
    console.log(e);
  }
};
