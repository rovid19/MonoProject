import BaseService from "./BaseService";
import { toJS } from "mobx";

class VehicleService extends BaseService {
  constructor() {
    super("http://localhost:3000/api/user");
  }

  async addVehicle(vehicleObject) {
    const plainJsVehicleObject = toJS(vehicleObject);
    return this.post("/add-vehicle", { plainJsVehicleObject });
  }

  getVehicles(sortBy, startingPrice, finalPrice, pageNumber) {
    return this.get("/get-vehicles", {
      page: pageNumber,
      sortBy,
      startingPrice,
      finalPrice,
    });
  }

  deleteVehicle(vehicleId) {
    return this.delete("/delete-vehicle", { vehicleId });
  }

  editVehicle(name, model, year, price, vehicleId) {
    return this.put("/edit-vehicle", { name, model, year, price, vehicleId });
  }

  getVehicleById(vehicleId) {
    return this.get(`/get-vehicle-by-id/${vehicleId}`);
  }
}

export default new VehicleService();
