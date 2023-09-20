import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../src/Pages/Home";
import AddVehicle from "../src/Pages/AddVehicle";
import Layout from "../src/Layout.jsx";
import EditVehicle from "./Pages/EditVehicle";
import { useEffect } from "react";
import { observer } from "mobx-react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/allvehicles?page=1&size=10");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/allvehicles" element={<Home />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          <Route path="/editvehicle/:vehicleId" element={<EditVehicle />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);
