import React, { useEffect, useState } from "react";
import { deleteVehicle, getVehicle } from "../../Services/ApiRequests.jsx";
import { vehicleData, vehicleDbId } from "../../Stores/Vehicle";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { subPage } from "../../Stores/Page";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [listGridToggle, setListGridToggle] = useState("List");
  const [vehicleId, setVehicleId] = useState(null);

  const allVehicles = toJS(vehicleData.allVehicle);
  const navigate = useNavigate();
  // fetch all vehicles from our database
  useEffect(() => {
    getVehicle();
  }, []);

  //delete vehicle from database
  useEffect(() => {
    if (vehicleId) {
      deleteVehicle(vehicleId);
    }
  }, [vehicleId]);

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
      {allVehicles.map((vehicle, i) => {
        return (
          <article
            className={
              listGridToggle === "List" ? "articleListHome" : "articleGridHome"
            }
          >
            <div className="optionsForVehicles">
              <button
                className="deleteListing"
                onClick={() => setVehicleId(vehicle._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={80}
                  height={100}
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="editListing"
                onClick={() => {
                  subPage.addPage("editVehicle");
                  vehicleDbId.addVehicleId(vehicle._id);
                  navigate(`/editvehicle/${vehicle._id}`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={80}
                  height={100}
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </button>
            </div>
            <div
              className={
                listGridToggle === "List" ? "articleListImg" : "articleGridImg"
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
