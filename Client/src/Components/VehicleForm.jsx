import React, { useEffect, useState } from "react";
import { action, toJS } from "mobx";
import { observer } from "mobx-react";
import { addVehicle, editVehicle } from "../Services/ApiRequests";
import { Vehicle, vehicle, vehicleDbId } from "../Stores/Vehicle";
import { useNavigate } from "react-router-dom";
import { subPage } from "../Stores/Page";

const VehicleForm = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState(null);
  const [vehiclePrice, setVehiclePrice] = useState(null);

  const navigate = useNavigate();

  // edit vehicle and save changes to the database
  const editVehicleForm = (e) => {
    e.preventDefault();
    editVehicle(
      vehicleName,
      vehicleModel,
      vehicleYear,
      vehiclePrice,
      vehicleDbId
    );
    navigate("/");
  };

  // add vehicle to the database if subPage is addVehicle
  const addVehicleToDatabase = action((e) => {
    e.preventDefault();
    const newVehicleForm = new Vehicle(
      vehicleName,
      vehicleModel,
      vehicleYear,
      vehiclePrice
    );

    // api post request to add newly formed vehicle object to the database
    addVehicle(newVehicleForm);
    setTimeout(() => {
      navigate("/");
    }, [500]);
  });

  // determine whether the subpage is for editing an existing vehicle or adding a new one, and set the four base vehicle states accordingly
  useEffect(() => {
    if (subPage.subPage === "editVehicle") {
      console.log(vehicle.vehicleName);
      setVehicleName(vehicle.vehicleName);
      setVehicleModel(vehicle.vehicleModel);
      setVehicleYear(vehicle.vehicleYear);
      setVehiclePrice(vehicle.vehiclePrice);
    }
  }, [subPage.subPage, vehicle.vehicleModel]);

  return (
    <form
      className="formMain"
      onSubmit={(e) => {
        if (subPage.subPage === "editVehicle") {
          editVehicleForm(e);
        } else {
          addVehicleToDatabase(e);
        }
      }}
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
        <button type="submit">
          {subPage.subPage === "editVehicle" ? "Save changes" : "Add vehicle"}
        </button>
      </div>
    </form>
  );
};

export default observer(VehicleForm);
