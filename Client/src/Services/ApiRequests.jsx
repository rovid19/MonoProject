import axios from "axios";
import { vehicleData } from "../Stores/Vehicle";
import { toJS } from "mobx";

axios.defaults.baseURL = "http://localhost:3000";

export const addVehicle = async (vehicleObject) => {
  const plainJsVehicleObject = toJS(vehicleObject);

  try {
    const data = await axios.post("/api/user/add-vehicle", {
      plainJsVehicleObject,
    });
    vehicleData.addVehicleToArray(data.data);
  } catch (e) {
    console.log(e);
  }
};

export const getVehicle = async () => {
  try {
    const data = await axios.get("/api/user/get-vehicles");
    vehicleData.newVehicleArray(data.data);
  } catch (e) {
    console.log(e);
  }
};

export const deleteVehicle = async (vehicleId) => {
  console.log(vehicleId);
  try {
    const data = await axios.delete("/api/user/delete-vehicle", {
      data: { vehicleId },
    });
    getVehicle();
  } catch (e) {
    console.log(e);
  }
};
