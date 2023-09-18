import { action, makeObservable, observable } from "mobx";
import vehicleService from "../Services/VehicleService";
import { Form } from "mobx-react-form";
import validatorjs from "validatorjs";
import {
  editVehicleForm,
  addVehicleToDatabase,
} from "../Components/VehicleForm";
import homeStore from "./HomeStore";

class VehicleStore {
  vehicles = [];
  lastPage = 0;
  vehicleName = "";
  vehicleModel = "";
  vehicleYear = "";
  vehiclePrice = "";
  getVehiclesTrigger = false;

  constructor(vehicles) {
    this.vehicles = vehicles;

    makeObservable(this, {
      vehicles: observable,
      lastPage: observable,
      vehicleName: observable,
      vehicleModel: observable,
      vehicleYear: observable,
      vehiclePrice: observable,
      getVehiclesTrigger: observable,
      addVehicle: action,
      getVehicles: action,
      getVehicleById: action,
      deleteVehicle: action,
      editVehicle: action,
    });
  }

  async addVehicle(vehicleObject) {
    try {
      const addedVehicle = await vehicleService.addVehicle(vehicleObject);
      // Add the newly added vehicle to the vehicles array
      this.vehicles.push(addedVehicle);
    } catch (e) {
      console.log(e);
    }
  }

  async getVehicles(sortBy, startingPrice, finalPrice, pageNumber) {
    try {
      const data = await vehicleService.getVehicles(
        sortBy,
        startingPrice,
        finalPrice,
        pageNumber
      );
      // Update the vehicles array and last page
      this.vehicles = data.allVehicles;
      this.lastPage = data.maxPage;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteVehicle(vehicleId) {
    try {
      await vehicleService.deleteVehicle(vehicleId);
      this.getVehiclesTrigger = !this.getVehiclesTrigger;
    } catch (e) {
      console.log(e);
    }
  }

  async editVehicle(name, model, year, price, vehicleId) {
    try {
      await vehicleService.editVehicle(name, model, year, price, vehicleId);
    } catch (e) {
      console.log(e);
    }
  }

  async getVehicleById(vehicleId) {
    try {
      const vehicle = await vehicleService.getVehicleById(vehicleId);
      (this.vehicleName = vehicle.makeId.name),
        (this.vehicleModel = vehicle.name),
        (this.vehicleYear = vehicle.yearMade),
        (this.vehiclePrice = vehicle.price);
    } catch (e) {
      console.log(e);
    }
  }
}

class VehicleId {
  vehicleId = "";

  constructor(vehicleId) {
    this.vehicleId = vehicleId;

    makeObservable(this, {
      vehicleId: observable,
    });
  }

  addVehicleId(vehicleId) {
    this.vehicleId = vehicleId;
  }
}

// VEHICLE FORM

const fields = {
  vehicleName: {
    label: "Vehicle Name",
    value: "",
    rules: "required|string|between:5,25",
  },
  vehicleModel: {
    label: "Vehicle Model",
    value: "",
    rules: "required|string|between:1,25",
  },
  vehicleYear: {
    label: "Model Year",
    value: null,
    rules: "required|numeric",
  },
  vehiclePrice: {
    label: "Vehicle Price",
    value: null,
    rules: "required|numeric",
  },
};

const hooks = {
  onSuccess(form) {
    if (homeStore.subPage === "editVehicle") {
      editVehicleForm();
    } else {
      addVehicleToDatabase();
    }
    form.reset();
  },
  onError(form) {
    console.log("Form Errors!", form.errors());
  },
};

const plugins = { dvr: validatorjs };

export const vehicleStore = new VehicleStore();
export const vehicleForm = new Form({ fields }, { hooks, plugins });
export const vehicleDbId = new VehicleId("");
