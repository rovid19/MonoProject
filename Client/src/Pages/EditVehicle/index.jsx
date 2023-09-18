import React, { useEffect } from "react";
import VehicleForm from "../../Components/VehicleForm";
import { vehicleDbId } from "../../Stores/VehicleStore";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { vehicleStore } from "../../Stores/VehicleStore";
import homeStore from "../../Stores/HomeStore";

const index = () => {
  const { vehicleId } = useParams();
  // if vehicle ID doesnt exists already, set vehicle ID
  useEffect(() => {
    if (!vehicleDbId.vehicleId) {
      vehicleDbId.addVehicleId(vehicleId);

      homeStore.setSubPage("editVehicle");
    }
  }, []);
  // fetch data about vehicle by their ID
  useEffect(() => {
    if (vehicleDbId) vehicleStore.getVehicleById(vehicleDbId.vehicleId);
  }, [vehicleDbId]);

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
