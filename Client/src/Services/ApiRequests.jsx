import axios from "axios";
import { vehicle, vehicleData } from "../Stores/Vehicle";
import { toJS } from "mobx";
import { page } from "../Stores/Page";

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

export const getVehicle = async (
  sortBy,
  startingPrice,
  finalPrice,
  pageNumber
) => {
  try {
    const data = await axios.get("/api/user/get-vehicles", {
      params: {
        page: pageNumber ? pageNumber : page.page,
        sortBy,
        startingPrice,
        finalPrice,
      },
    });
    vehicleData.newVehicleArray(data.data.allVehicles);
    page.setLastPage(data.data.maxPage);
  } catch (e) {
    console.log(e);
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    await axios.delete("/api/user/delete-vehicle", {
      data: { vehicleId },
    });
    getVehicle();
  } catch (e) {
    console.log(e);
  }
};

export const editVehicle = async (name, model, year, price, vehicleId) => {
  try {
    await axios.put("/api/user/edit-vehicle", {
      name,
      model,
      year,
      price,
      vehicleId,
    });
    getVehicle();
  } catch (e) {
    console.log(e);
  }
};

export const getVehicleById = async (vehicleId) => {
  try {
    const response = await axios.get(
      `/api/user/get-vehicle-by-id/${vehicleId.vehicleId}`
    );
    const data = response.data;

    vehicle.newVehicle(data.makeId.name, data.name, data.yearMade, data.price);
  } catch (e) {
    console.log(e);
  }
};

export const sortingFiltering = async (sort, startingPrice, finalPrice) => {
  try {
    const response = await axios.get("/api/user/filter-sort-page", {
      params: {},
    });
  } catch (e) {
    console.log(e);
  }
};
