import { Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home.jsx";
import AddVehicle from "../src/Pages/AddVehicle";
import Layout from "./Layout";
import { vehicleData } from "./Stores/Vehicle";

function App() {
  console.log(vehicleData);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
