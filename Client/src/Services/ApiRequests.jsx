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
    vehicleData.addVehicleToArray(data);
  } catch (e) {
    console.log(e);
  }
};
