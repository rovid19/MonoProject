import React from "react";
import VehicleForm from "../../Components/VehicleForm";
import { vehicleData } from "../../Stores/Vehicle";

const index = () => {
  console.log(vehicleData, "ok");
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

export default index;
