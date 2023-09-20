import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { vehicleStore } from "../../Stores/VehicleStore";
import homeStore from "../../Stores/HomeStore";
import { sortFilterForm } from "../../Stores/HomeStore";

//const form = extraOptionsForm;
let sideEffectTrigger = 0;
export const submitSortFilter = () => {
  const startingPrice = sortFilterForm.values().startingPrice;
  const finalPrice = sortFilterForm.values().finalPrice;
  const sortBy = sortFilterForm.values().sortBy;
  // Initialize the base URL without any sorting or filtering parameters, only including paging
  let baseUrl = `/allvehicles?page=${homeStore.page}&size=10`;
  // Initialize query parameter for price filtering
  let filterUrl = "";
  // Initialize query parameter for sorting
  let sortUrl = "";

  // Handle price filtering set by the user
  if (sortFilterForm.values().startingPrice) {
    filterUrl = `&price=${startingPrice}-${finalPrice}`;
  } else {
    filterUrl = "";
  }
  // Handle sorting set by the user
  switch (sortBy) {
    case "Highest to lowest price":
      sortUrl = "&sort=htl_price";
      break;
    case "Lowest to highest price":
      sortUrl = "&sort=lth_price";
      break;
    case "None":
      sortUrl = "";
      break;
  }

  homeStore.navigate(baseUrl + filterUrl + sortUrl);
  // Populate a MobX object with query parameters
  const queryP = window.location.search.replace(
    `?page=${homeStore.page}&size=10`,
    ""
  );
  homeStore.setQuery(queryP);

  // API request
  vehicleStore.getVehicles(sortBy, startingPrice, finalPrice, homeStore.page);

  // Increment sideEffectTrigger to close modal via useEffect
  sideEffectTrigger++;
};

const ExtraOptionsModal = ({ setIsExtraOptionsVisible }) => {
  const [isFilterPriceVisible, setIsFilterPriceVisible] = useState(false);
  const navigateHook = useNavigate();

  // Close the modal post-submission
  useEffect(() => {
    if (sideEffectTrigger > 0) {
      setIsExtraOptionsVisible(false);
      sideEffectTrigger--;
    }
  }, [sideEffectTrigger]);

  // If the user previously set a price filter, reapply it as soon as the extra options modal is displayed
  useEffect(() => {
    if (sortFilterForm.values().startingPrice) {
      setIsFilterPriceVisible(true);
    }
  }, []);

  // Store the navigate function in MobX due to hook limitations
  useEffect(() => {
    homeStore.setNavigate(navigateHook);
  }, []);

  return (
    <div className="eomMainDiv">
      <div className="eomSecondaryDiv">
        <button
          className="eomCloseBtn"
          onClick={() => {
            setIsExtraOptionsVisible(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width={30}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <form className="eomForm" onSubmit={sortFilterForm.onSubmit}>
          <fieldset>
            <div className="eomSortBy">
              <label htmlFor="sortOrder" className="eomH1">
                Sort by:
              </label>
              <select
                {...sortFilterForm.$("sortBy").bind()}
                className="eomSelect"
              >
                {toJS(
                  sortFilterForm.fields.data_.get("sortBy").value_.$options
                ).map((option, i) => {
                  return <option key={i}>{option.label}</option>;
                })}
              </select>
            </div>

            <div className="eomFilterPrice">
              <label className="eomH1">Filter by price:</label>
              <div>
                {isFilterPriceVisible ? (
                  <>
                    {" "}
                    <span>
                      <button
                        className="eomRemoveFilterPrice"
                        onClick={() => {
                          setIsFilterPriceVisible(false);
                          sortFilterForm.$("startingPrice").set("value", null);
                          sortFilterForm.$("finalPrice").set("value", null);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          width={30}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </span>
                    <input
                      {...sortFilterForm.$("startingPrice").bind()}
                      id="fromPrice"
                      className="eomPrice"
                      name="fromPrice"
                      type="number"
                    />
                    <label htmlFor="toPrice" className="eomEuro">
                      To
                    </label>
                    <input
                      {...sortFilterForm.$("finalPrice").bind()}
                      id="toPrice"
                      className="eomPrice"
                      name="toPrice"
                      type="number"
                    />
                    <span>€</span>
                  </>
                ) : (
                  <button
                    className="eomFilterButton"
                    onClick={() => setIsFilterPriceVisible(true)}
                  >
                    Add filter by price
                  </button>
                )}
              </div>
            </div>

            <button className="eomSaveBtn" type="submit">
              Save
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default observer(ExtraOptionsModal);
