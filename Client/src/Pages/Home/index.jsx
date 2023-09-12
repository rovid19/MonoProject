import React, { useEffect, useState } from "react";
import { getVehicle } from "../../Services/ApiRequests";
import { vehicleData } from "../../Stores/Vehicle";
import { toJS } from "mobx";
import { observer } from "mobx-react";

const index = () => {
  const [listGridToggle, setListGridToggle] = useState("List");
  const allVehicles = toJS(vehicleData.allVehicle);
  // fetch all vehicles from our database
  useEffect(() => {
    getVehicle();
  }, []);

  console.log(allVehicles);
  return (
    <section
      className={
        listGridToggle === "List" ? "sectionHomeList" : "sectionHomeGrid"
      }
    >
      <button className="buttonListGridToggle">
        <select
          className="selectListGridToggle"
          onChange={(e) => setListGridToggle(e.target.value)}
        >
          <option>List</option>
          <option>Grid</option>
        </select>
      </button>
      {allVehicles.length > 0 &&
        allVehicles.map((vehicle) => {
          console.log(vehicle);
          return (
            <article
              className={
                listGridToggle === "List"
                  ? "articleListHome"
                  : "articleGridHome"
              }
            >
              <div
                className={
                  listGridToggle === "List"
                    ? "articleListImg"
                    : "articleGridImg"
                }
              >
                <img></img>
              </div>
              {listGridToggle === "Grid" ? (
                <>
                  <div className="gridArticleBox">
                    <div className="articleGridInfo">
                      <h1>Vehicle Name</h1>
                      <h2>
                        {vehicle &&
                          vehicle.makeId.name +
                            " " +
                            vehicle.name +
                            " " +
                            vehicle.yearMade}
                      </h2>
                    </div>
                    <div className="articleGridPrice">
                      {" "}
                      <h1>Vehicle Price</h1>
                      <h2>{vehicle && vehicle.price}€</h2>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="articleListInfo">
                    <h1>Vehicle Name</h1>
                    <h2>
                      {vehicle &&
                        vehicle.makeId.name +
                          " " +
                          vehicle.name +
                          " " +
                          vehicle.yearMade}
                    </h2>
                  </div>
                  <div className="articleListPrice">
                    {" "}
                    <h1>Vehicle Price</h1>
                    <h2>{vehicle && vehicle.price}€</h2>
                  </div>
                </>
              )}
            </article>
          );
        })}
    </section>
  );
};

export default observer(index);
