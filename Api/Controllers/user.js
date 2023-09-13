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

export const deleteVehicle = async (req, res) => {
  const { vehicleId } = req.body;

  const deleteVehicle = await vehicleModel.findByIdAndDelete(vehicleId);

  res.json("ok");
};

export const getVehicleById = async (req, res) => {
  const { vehicleId } = req.params;

  const findVehicle = await vehicleModel
    .findById(vehicleId)
    .populate("makeId", "name");

  res.json(findVehicle);
};

export const editVehicle = async (req, res) => {
  const { vehicleId, name, model, year, price } = req.body;
  const vehicleM = await vehicleModel.findById(vehicleId.vehicleId);
  const vehicleMa = await vehicleMake.findById(vehicleM.makeId._id);

  vehicleM.set({
    name: model,
    yearMade: year,
    price: price,
  });

  vehicleMa.set({
    name: name,
  });

  await vehicleM.save();
  await vehicleMa.save();
  res.json(vehicleM);
};
