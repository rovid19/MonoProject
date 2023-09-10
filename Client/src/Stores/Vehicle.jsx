import { action, makeObservable, observable } from "mobx";

class Vehicle {
  vehicleName = "";
  vehicleModel = "";
  vehicleYear = "";
  vehiclePrice = "";

  constructor(name, model, year, price) {
    this.vehicleName = name;
    this.vehicleModel = model;
    this.vehicleYear = year;
    this.vehiclePrice = price;
  }
}

class AllVehicle {
  allVehicle = [];

  constructor(vehicleArray) {
    this.allVehicle = vehicleArray;

    makeObservable(this, {
      allVehicle: observable,
      newVehicleArray: action,
      addVehicleToArray: action,
    });
  }

  newVehicleArray(vehicleArray) {
    this.allVehicle = vehicleArray;
  }

  addVehicleToArray(vehicle) {
    this.allVehicle.push(vehicle);
  }
}

export const vehicleData = new AllVehicle([]);
export { Vehicle, AllVehicle };
