import React, { useEffect } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { addVehicle, editVehicle } from "../Services/ApiRequests";
import { vehicle, vehicleDbId } from "../Stores/Vehicle";
import { useNavigate } from "react-router-dom";
import { subPage } from "../Stores/Page";
import vehicleForm from "../Stores/Forms";
import { navigate } from "../Stores/Navigate";

const form = vehicleForm;

// edit vehicle and save changes to the database
export const editVehicleForm = () => {
  const { vehicleName, vehicleModel, vehicleYear, vehiclePrice } =
    form.values();
  editVehicle(
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    vehicleDbId
  );
  navigate.navigate("/");
};

// add vehicle to the database if subPage is addVehicle
export const addVehicleToDatabase = action(() => {
  const { vehicleName, vehicleModel, vehicleYear, vehiclePrice } =
    form.values();

  const newVehicleForm = {
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
  };

  // api post request to add newly formed vehicle object to the database
  addVehicle(newVehicleForm);
  setTimeout(() => {
    navigate.navigate("/");
  }, [500]);
});

const VehicleForm = () => {
  const navigateHook = useNavigate();

  // determine whether the subpage is for editing an existing vehicle or adding a new one, and set the four base vehicle states accordingly
  useEffect(() => {
    if (subPage.subPage === "editVehicle") {
      form.update({
        vehicleName: vehicle.vehicleName,
        vehicleModel: vehicle.vehicleModel,
        vehicleYear: vehicle.vehicleYear,
        vehiclePrice: vehicle.vehiclePrice,
      });
    }
  }, [subPage.subPage, vehicle.vehicleModel]);

  //set navigate as mobx value since I can't use hooks and mobx together
  useEffect(() => {
    navigate.setNavigate(navigateHook);
  }, []);

  return (
    <form className="formMain" onSubmit={form.onSubmit}>
      <fieldset className="fieldsetForm">
        <div>
          <legend className="legendForm">Vehicle Information</legend>
        </div>
        <div className="divForm">
          <label className="labelForm" htmlFor="vehicleName">
            {form.$("vehicleName").label}
          </label>
          <input {...form.$("vehicleName").bind()} className="inputForm" />
        </div>

        <div className="divForm">
          <label className="labelForm" htmlFor="vehicleModel">
            {form.$("vehicleModel").label}
          </label>
          <input {...form.$("vehicleModel").bind()} className="inputForm" />
        </div>

        <div className="divForm">
          <label className="labelForm" htmlFor="vehicleYear">
            {form.$("vehicleYear").label}
          </label>
          <input {...form.$("vehicleYear").bind()} className="inputForm" />
        </div>

        <div className="divForm">
          <label className="labelForm" htmlFor="vehiclePrice">
            {form.$("vehiclePrice").label}
          </label>
          <input {...form.$("vehiclePrice").bind()} className="inputForm" />
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
