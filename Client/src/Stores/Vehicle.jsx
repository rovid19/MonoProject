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

    makeObservable(this, {
      vehicleName: observable,
      vehicleModel: observable,
      vehicleYear: observable,
      vehiclePrice: observable,
    });
  }

  newVehicle(name, model, year, price) {
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
export const vehicle = new Vehicle("", "", "", "");
export const vehicleDbId = new VehicleId("");
export const vehicleData = new AllVehicle([]);
export { Vehicle, AllVehicle, VehicleId };
