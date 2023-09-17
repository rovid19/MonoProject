import React, { useEffect, useState } from "react";
import { deleteVehicle, getVehicle } from "../../Services/ApiRequests.jsx";
import { vehicleData, vehicleDbId } from "../../Stores/Vehicle";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { subPage } from "../../Stores/Page";
import { useLocation, useNavigate } from "react-router-dom";
import ExtraOptionsModal from "./ExtraOptionsModal.jsx";
import ExtraOptionsControls from "./ExtraOptionsControls.jsx";
import AllVehiclesMap from "./AllVehiclesMap.jsx";
import { page } from "../../Stores/Page";
import { queryParams } from "../../Stores/Query.jsx";

const index = () => {
  const [listGridToggle, setListGridToggle] = useState("List");
  const [vehicleId, setVehicleId] = useState(null);
  const [isExtraOptionsVisible, setIsExtraOptionsVisible] = useState(false);

  // Convert MobX observable to a plain JavaScript object
  const allVehicles = toJS(vehicleData.allVehicle);

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
      navigate(`/allvehicles?page=${queryPage}&size=10` + queryParams);
      setTimeout(() => {
        page.setPage(queryPage);
      }, 100);
    }
    // Redirect to default page upon initial entry
    else {
      navigate(`/allvehicles?page=${subPage}&size=10` + queryParams);
    }
  }, []);

  // Retrieve all vehicle records from the database
  useEffect(() => {
    const pageNumber = page.page;
    const sortBy = query.get("sort");
    const filterPrice = query.get("price");
    // Populate a MobX object with query parameters
    const queryP = window.location.search.replace(
      `?page=${page.page}&size=10`,
      ""
    );
    queryParams.addQueryParams(queryP);
    // Finding the position of the first dash ('-') in the 'price' query parameter
    const dashIndex = filterPrice && filterPrice.indexOf("-");
    // Extract the 'startingPrice' and 'finalPrice' from the 'filterPrice' parameter for further processing
    const startingPrice = filterPrice && filterPrice.slice(0, dashIndex);
    const finalPrice =
      filterPrice && filterPrice.slice(dashIndex + 1, filterPrice.length);

    getVehicle(sortBy, startingPrice, finalPrice, pageNumber);
  }, [page.page]);

  // Remove vehicle record from the database
  useEffect(() => {
    if (vehicleId) {
      deleteVehicle(vehicleId);
    }
  }, [vehicleId]);

  // Retrieve query parameters from the URL
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

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
        allVehicles={allVehicles}
        listGridToggle={listGridToggle}
        subPage={subPage}
        navigate={navigate}
        vehicleDbId={vehicleDbId}
      />
    </section>
  );
};

export default observer(index);
