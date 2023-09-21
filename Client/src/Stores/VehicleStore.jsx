import { action, makeObservable, observable, toJS } from "mobx";
import vehicleService from "../Services/VehicleService";
import { Form } from "mobx-react-form";
import validatorjs from "validatorjs";
import {
  editVehicleForm,
  addVehicleToDatabase,
} from "../Components/VehicleForm";
import homeStore from "./HomeStore";

// VEHICLE FORM

const fields = {
  vehiclePicture: {
    label: "Vehicle Picture",
    value: "",
  },
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
  },
  onError(form) {
    console.log("Form Errors!", form.errors());
  },
};

const plugins = { dvr: validatorjs };
export const vehicleForm = new Form({ fields }, { hooks, plugins });

// VEHICLE STORE
class VehicleStore {
  vehicles = [];
  lastPage = 0;
  vehicleName = "";
  vehicleModel = "";
  vehicleYear = "";
  vehiclePrice = "";
  vehiclePicture = "";
  vehicleFormData = null;
  getVehiclesTrigger = false;
  isEditVehicle = false;

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
      vehiclePicture: observable,
      vehicleFormData: observable,
      isEditVehicle: observable,
      addVehicle: action,
      getVehicles: action,
      getVehicleById: action,
      deleteVehicle: action,
      editVehicle: action,
      uploadVehiclePicture: action,
      setVehicleFormData: action,
      setVehiclePicture: action,
      updateVehiclesAndPage: action,
      setEditModeOn: action,
      setVehiclesTrigger: action,
      setVehicle: action,
    });
  }

  async addVehicle(vehicleObject) {
    try {
      const addedVehicle = await vehicleService.addVehicle(vehicleObject);
      // Add the newly added vehicle to the vehicles array
      this.vehicles.push(addedVehicle);
      this.setVehiclePicture("");
      vehicleForm.reset();
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
      this.updateVehiclesAndPage(data.allVehicles, data.maxPage);
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

  async editVehicle(name, model, year, price, vehicleId, picture) {
    try {
      await vehicleService.editVehicle(
        name,
        model,
        year,
        price,
        vehicleId,
        picture
      );
      this.setVehiclesTrigger(!this.getVehiclesTrigger);
    } catch (e) {
      console.log(e);
    }
  }

  async getVehicleById(vehicleId) {
    try {
      const vehicle = await vehicleService.getVehicleById(vehicleId);
      this.setVehicle(
        vehicle.makeId.name,
        vehicle.name,
        vehicle.yearMade,
        vehicle.price
      );

      this.setVehiclePicture(vehicle.picture);
      this.setEditModeOn(!this.isEditVehicle);
    } catch (e) {
      console.log(e);
    }
  }

  async uploadVehiclePicture(picture) {
    const jsPic = toJS(picture);
    try {
      const uploadedPicture = await vehicleService.uploadVehiclePicture(jsPic);
      this.setVehiclePicture(uploadedPicture);
    } catch (e) {
      console.log(e);
    }
  }

  setVehicleFormData(formData) {
    this.vehicleFormData = formData;
  }
  setVehiclePicture(picture) {
    this.vehiclePicture = picture;
  }
  updateVehiclesAndPage(vehicles, page) {
    (this.vehicles = vehicles), (this.lastPage = page);
  }
  setEditModeOn(edit) {
    this.isEditVehicle = edit;
  }
  setVehiclesTrigger(vehiclesTrigger) {
    this.getVehiclesTrigger = vehiclesTrigger;
  }
  setVehicle(name, model, year, price) {
    (this.vehicleName = name),
      (this.vehicleModel = model),
      (this.vehicleYear = year),
      (this.vehiclePrice = price);
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

export const vehicleStore = new VehicleStore();
export const vehicleDbId = new VehicleId("");
