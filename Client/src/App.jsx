import { Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import AddVehicle from "../src/Pages/AddVehicle";
import Layout from "../src/Layout.jsx";
import { vehicleData } from "./Stores/Vehicle";
import EditVehicle from "./Pages/EditVehicle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          <Route path="/editvehicle/:vehicleId" element={<EditVehicle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
