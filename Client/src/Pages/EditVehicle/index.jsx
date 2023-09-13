import React, { useEffect } from "react";
import VehicleForm from "../../Components/VehicleForm";
import { vehicleDbId } from "../../Stores/Vehicle";
import { getVehicleById } from "../../Services/ApiRequests";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { subPage } from "../../Stores/Page";

const index = () => {
  const { vehicleId } = useParams();
  // if vehicle ID doesnt exists already, set vehicle ID
  useEffect(() => {
    if (!vehicleDbId.vehicleId) {
      vehicleDbId.addVehicleId(vehicleId);

      subPage.addPage("editVehicle");
    }
  }, []);
  // fetch data about vehicle by their ID
  useEffect(() => {
    if (vehicleDbId) getVehicleById(vehicleDbId);
  }, [vehicleDbId]);
  console.log(subPage.subPage);
  return (
    <section className="mainSection">
      <div className="mainDiv">
        <div className="secondaryDiv">
          <VehicleForm />
        </div>
      </div>{" "}
    </section>
  );
};

export default observer(index);
