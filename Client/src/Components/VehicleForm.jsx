import React, { useEffect } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { vehicleDbId } from "../Stores/VehicleStore";
import { useNavigate } from "react-router-dom";
import homeStore from "../Stores/HomeStore";
//import vehicleForm from "../Stores/VehicleForm";
import { vehicleStore } from "../Stores/VehicleStore";
import { vehicleForm } from "../Stores/VehicleStore";

//const form = vehicleForm;

// edit vehicle and save changes to the database
export const editVehicleForm = () => {
  const { vehicleName, vehicleModel, vehicleYear, vehiclePrice } =
    vehicleForm.values();
  vehicleStore.editVehicle(
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    vehicleDbId
  );
  homeStore.navigate("/allvehicles?page=1&size=10");
};

// Insert new vehicle into database
export const addVehicleToDatabase = action(() => {
  const { vehicleName, vehicleModel, vehicleYear, vehiclePrice } =
    vehicleForm.values();

  const newVehicleForm = {
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
  };

  // Make API call to add new vehicle to database
  vehicleStore.addVehicle(newVehicleForm);
  setTimeout(() => {
    homeStore.navigate("/allvehicles?page=1&size=10");
  }, [500]);
});

const VehicleForm = () => {
  const navigateHook = useNavigate();

  // Determine whether the subpage is for editing an existing vehicle or adding a new one, and set the four base vehicle states accordingly
  useEffect(() => {
    if (homeStore.subPage === "editVehicle") {
      vehicleForm.update({
        vehicleName: vehicleStore.vehicleName,
        vehicleModel: vehicleStore.vehicleModel,
        vehicleYear: vehicleStore.vehicleYear,
        vehiclePrice: vehicleStore.vehiclePrice,
      });
    }
  }, [homeStore.subPage, vehicleStore.vehicleModel, vehicleStore.vehiclePrice]);

  // Store the navigate function in MobX due to hook limitations
  useEffect(() => {
    homeStore.setNavigate(navigateHook);
  }, []);

  return (
    <form className="formMain" onSubmit={vehicleForm.onSubmit}>
      <fieldset className="fieldsetForm">
        <div>
          <legend className="legendForm">Vehicle Information</legend>
        </div>
        <div className="divForm">
          <label className="labelForm" htmlFor="vehicleName">
            {vehicleForm.$("vehicleName").label}
          </label>
          <input
            {...vehicleForm.$("vehicleName").bind()}
            className="inputForm"
          />
        </div>

        <div className="divForm">
          <label className="labelForm" htmlFor="vehicleModel">
            {vehicleForm.$("vehicleModel").label}
          </label>
          <input
            {...vehicleForm.$("vehicleModel").bind()}
            className="inputForm"
          />
        </div>

        <div className="divForm">
          <label className="labelForm" htmlFor="vehicleYear">
            {vehicleForm.$("vehicleYear").label}
          </label>
          <input
            type="number"
            {...vehicleForm.$("vehicleYear").bind()}
            className="inputForm"
          />
        </div>

        <div className="divForm">
          <label className="labelForm" htmlFor="vehiclePrice">
            {vehicleForm.$("vehiclePrice").label}
          </label>
          <input
            type="number"
            {...vehicleForm.$("vehiclePrice").bind()}
            className="inputForm"
          />
        </div>
      </fieldset>

      <div className="buttonDiv">
        <button type="submit">
          {homeStore.subPage === "editVehicle" ? "Save changes" : "Add vehicle"}
        </button>
      </div>
    </form>
  );
};

export default observer(VehicleForm);
