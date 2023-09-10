import React, { useEffect, useState } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { addVehicle } from "../Services/ApiRequests";
import { Vehicle } from "../Stores/Vehicle";

const VehicleForm = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState(0);
  const [vehiclePrice, setVehiclePrice] = useState(0);

  // fetch vehicle data if appPage is editVehicle
  useEffect(() => {}, []);

  // add vehicle to database if appPage is addVehicle
  const addVehicleToDatabase = action((e) => {
    e.preventDefault();
    const newVehicleForm = new Vehicle(
      vehicleName,
      vehicleModel,
      vehicleYear,
      vehiclePrice
    );

    // api post request to add newly formed vehicle object to database
    addVehicle(newVehicleForm);
  });

  useEffect(() => {}, []);
  return (
    <form
      action="/submit"
      method="post"
      className="formMain"
      onSubmit={addVehicleToDatabase}
    >
      <fieldset className="fieldsetForm">
        <div>
          <legend className="legendForm">Vehicle Information</legend>
        </div>
        <div className="divForm">
          <label className="labelForm" for="Vehicle Name">
            Vehicle Name:
          </label>
          <input
            onChange={(e) => setVehicleName(e.target.value)}
            defaultValue={vehicleName}
            className="inputForm"
            type="text"
            id="vehicleName"
            name="vehicleName"
            required
          />
        </div>
        <div className="divForm">
          <label className="labelForm" for="Vehicle Model">
            Vehicle Model:
          </label>
          <input
            onChange={(e) => setVehicleModel(e.target.value)}
            defaultValue={vehicleModel}
            className="inputForm"
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            required
          />
        </div>
        <div className="divForm">
          <label className="labelForm" for="Model Year">
            Model Year:
          </label>
          <input
            onChange={(e) => setVehicleYear(e.target.value)}
            defaultValue={vehicleYear}
            className="inputForm"
            type="number"
            id="modelYear"
            name="modelYear"
            required
          />
        </div>
        <div className="divForm">
          <label className="labelForm" for="Vehicle Price">
            Vehicle Price:
          </label>
          <input
            onChange={(e) => setVehiclePrice(e.target.value)}
            defaultValue={vehiclePrice}
            className="inputForm"
            type="number"
            id="vehiclePrice"
            name="vehiclePrice"
            required
          />
        </div>
      </fieldset>
      <div className="buttonDiv">
        <button type="submit">Add vehicle</button>
      </div>
    </form>
  );
};

export default observer(VehicleForm);
