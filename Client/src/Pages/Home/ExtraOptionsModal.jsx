import React, { useEffect, useState } from "react";
import extraOptionsForm from "../../Stores/ExtraOptionsForm";
import { observer } from "mobx-react";
import { navigate } from "../../Stores/Navigate";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { page } from "../../Stores/Page";
import { getVehicle } from "../../Services/ApiRequests";
import { queryParams } from "../../Stores/Query";

const form = extraOptionsForm;
let sideEffectTrigger = 0;
export const submitSortFilter = () => {
  const startingPrice = form.values().startingPrice;
  const finalPrice = form.values().finalPrice;
  const sortBy = form.values().sortBy;
  // Initialize the base URL without any sorting or filtering parameters, only including paging
  let baseUrl = `/allvehicles?page=${page.page}&size=10`;
  // Initialize query parameter for price filtering
  let filterUrl = "";
  // Initialize query parameter for sorting
  let sortUrl = "";

  // Handle price filtering set by the user
  if (form.values().startingPrice) {
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

  navigate.navigate(baseUrl + filterUrl + sortUrl);
  // Populate a MobX object with query parameters
  const queryP = window.location.search.replace(
    `?page=${page.page}&size=10`,
    ""
  );
  queryParams.addQueryParams(queryP);

  // API request
  getVehicle(sortBy, startingPrice, finalPrice);

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
    if (form.values().startingPrice) {
      setIsFilterPriceVisible(true);
    }
  }, []);

  // Store the navigate function in MobX due to hook limitations
  useEffect(() => {
    navigate.setNavigate(navigateHook);
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
        <form className="eomForm" onSubmit={form.onSubmit}>
          <fieldset>
            <div className="eomSortBy">
              <label htmlFor="sortOrder" className="eomH1">
                Sort by:
              </label>
              <select {...form.$("sortBy").bind()} className="eomSelect">
                {toJS(form.fields.data_.get("sortBy").value_.$options).map(
                  (option, i) => {
                    return <option key={i}>{option.label}</option>;
                  }
                )}
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
                          form.$("startingPrice").set("value", null);
                          form.$("finalPrice").set("value", null);
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
                      {...form.$("startingPrice").bind()}
                      id="fromPrice"
                      className="eomPrice"
                      name="fromPrice"
                      type="number"
                    />
                    <label htmlFor="toPrice" className="eomEuro">
                      To
                    </label>
                    <input
                      {...form.$("finalPrice").bind()}
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
