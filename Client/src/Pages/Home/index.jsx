import React, { useEffect, useState } from "react";
import { vehicleDbId } from "../../Stores/VehicleStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import ExtraOptionsModal from "./ExtraOptionsModal.jsx";
import ExtraOptionsControls from "./ExtraOptionsControls.jsx";
import AllVehiclesMap from "./AllVehiclesMap.jsx";
import { vehicleStore } from "../../Stores/VehicleStore";
import homeStore from "../../Stores/HomeStore";

const index = () => {
  const [listGridToggle, setListGridToggle] = useState("List");
  const [vehicleId, setVehicleId] = useState(null);
  const [isExtraOptionsVisible, setIsExtraOptionsVisible] = useState(false);

  // Convert MobX observable to a plain JavaScript object
  //const allVehicles = toJS(vehicleData.allVehicle);

  const navigate = useNavigate();
  const query = useQuery();

  // Initialize url parameters upon first page load
  useEffect(() => {
    const queryPage = query.get("page");
    const queryParams = window.location.search.replace(
      `?page=${queryPage}&size=10`,
      ""
    );

    // Handle cases where the user manually enters a URL
    if (queryPage) {
      setTimeout(() => {
        navigate(`/allvehicles?page=${queryPage}&size=10` + queryParams);
        setTimeout(() => {
          homeStore.setPage(queryPage);
        }, 100);
      }, [100]);
    }
    // Redirect to default page upon initial entry
    else {
      setTimeout(() => {
        navigate(`/allvehicles?page=${homeStore.page}&size=10` + queryParams);
      }),
        [100];
    }
  }, []);

  // Retrieve all vehicle records from the database
  useEffect(() => {
    const pageNumber = homeStore.page;
    const sortBy = query.get("sort");
    const filterPrice = query.get("price");
    // Populate a MobX object with query parameters
    const queryP = window.location.search.replace(
      `?page=${homeStore.page}&size=10`,
      ""
    );
    homeStore.setQuery(queryP);
    // Finding the position of the first dash ('-') in the 'price' query parameter
    const dashIndex = filterPrice && filterPrice.indexOf("-");
    // Extract the 'startingPrice' and 'finalPrice' from the 'filterPrice' parameter for further processing
    const startingPrice = filterPrice && filterPrice.slice(0, dashIndex);
    const finalPrice =
      filterPrice && filterPrice.slice(dashIndex + 1, filterPrice.length);

    vehicleStore.getVehicles(sortBy, startingPrice, finalPrice, pageNumber);
  }, [homeStore.page, vehicleStore.getVehiclesTrigger]);

  // Remove vehicle record from the database
  useEffect(() => {
    if (vehicleId) {
      vehicleStore.deleteVehicle(vehicleId);
    }
  }, [vehicleId]);

  // Retrieve query parameters from the URL
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  console.log(vehicleStore.getVehiclesTrigger);
  return (
    <section
      className={
        listGridToggle === "List" ? "sectionHomeList" : "sectionHomeGrid"
      }
    >
      {isExtraOptionsVisible && (
        <ExtraOptionsModal
          setIsExtraOptionsVisible={setIsExtraOptionsVisible}
          query={query}
          navigate={navigate}
        />
      )}

      <ExtraOptionsControls
        setIsExtraOptionsVisible={setIsExtraOptionsVisible}
        setListGridToggle={setListGridToggle}
      />

      <AllVehiclesMap
        setVehicleId={setVehicleId}
        listGridToggle={listGridToggle}
        navigate={navigate}
        vehicleDbId={vehicleDbId}
      />
    </section>
  );
};

export default observer(index);
