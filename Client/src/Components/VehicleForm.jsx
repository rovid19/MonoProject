import React, { useEffect } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { vehicleDbId } from "../Stores/VehicleStore";
import { useNavigate } from "react-router-dom";
import homeStore from "../Stores/HomeStore";
import { vehicleStore } from "../Stores/VehicleStore";
import { vehicleForm } from "../Stores/VehicleStore";
import { pictureUpload } from "../Utils/PictureUpload";

// edit vehicle and save changes to the database
export const editVehicleForm = () => {
  const {
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    vehiclePicture,
  } = vehicleForm.values();
  vehicleStore.editVehicle(
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    vehicleDbId,
    vehiclePicture
  );
  homeStore.navigate("/allvehicles?page=1&size=10");
  vehicleStore.setVehicleFormData(null);
};

// Insert new vehicle into database
export const addVehicleToDatabase = action(() => {
  const {
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    vehiclePicture,
  } = vehicleForm.values();

  const newVehicleForm = {
    vehicleName,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    vehiclePicture,
  };

  // Make API call to add new vehicle to database
  vehicleStore.addVehicle(newVehicleForm);
  setTimeout(() => {
    homeStore.navigate("/allvehicles?page=1&size=10");
    vehicleStore.setVehiclePicture("");
    vehicleStore.setVehicleFormData(null);
  }, [500]);
});

const VehicleForm = () => {
  const navigateHook = useNavigate();

  // Determine whether the subpage is for editing an existing vehicle or adding a new one, and set the four base vehicle states accordingly
  useEffect(() => {
    if (homeStore.subPage === "editVehicle") {
      console.log("updated");
      vehicleForm.update({
        vehicleName: vehicleStore.vehicleName,
        vehicleModel: vehicleStore.vehicleModel,
        vehicleYear: vehicleStore.vehicleYear,
        vehiclePrice: vehicleStore.vehiclePrice,
        vehiclePicture: vehicleStore.vehiclePicture,
      });
    } else {
      vehicleForm.$("vehiclePicture").set(vehicleStore.vehiclePicture);
    }
  }, [vehicleStore.isEditVehicle, vehicleStore.vehiclePicture]);

  // Store the navigate function in MobX due to hook limitations
  useEffect(() => {
    homeStore.setNavigate(navigateHook);
  }, []);

  // Upload vehicle picture
  useEffect(() => {
    if (vehicleStore.vehicleFormData) {
      vehicleStore.uploadVehiclePicture(vehicleStore.vehicleFormData);
    }
  }, [vehicleStore.vehicleFormData]);

  return (
    <form className="formMain" onSubmit={vehicleForm.onSubmit}>
      <fieldset className="fieldsetForm">
        <div className="formPictureDiv">
          <label htmlFor="vehiclePicture">
            {!vehicleStore.vehiclePicture ? (
              <div className="uploadIconDiv">
                <svg
                  className="formUploadIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width={60}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span>
                  <h3 className="uploadIconText">
                    {" "}
                    click here to upload your picture
                  </h3>
                </span>
              </div>
            ) : (
              <>
                <img
                  src={vehicleStore.vehiclePicture}
                  className="formPicture"
                ></img>
                <div className="editPictureDiv">
                  <svg
                    className="formUploadIconEdit"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width={60}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <h3 className="editH">
                    click here to change vehicle picture
                  </h3>
                </div>
              </>
            )}
            <input
              type="file"
              onChange={pictureUpload}
              className="vehiclePictureLabel"
            />
          </label>
        </div>
        <div className="formInfoDiv">
          <legend> Vehicle Information</legend>
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
          </div>{" "}
          <div className="buttonDiv">
            <button type="submit">
              {homeStore.subPage === "editVehicle"
                ? "Save changes"
                : "Add vehicle"}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default observer(VehicleForm);
