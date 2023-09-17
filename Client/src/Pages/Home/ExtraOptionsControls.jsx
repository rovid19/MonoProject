import React from "react";
import { observer } from "mobx-react";
import { page } from "../../Stores/Page";
import { useEffect } from "react";
import { navigate } from "../../Stores/Navigate";
import { useNavigate } from "react-router-dom";
import { queryParams } from "../../Stores/Query";

const ExtraOptionsControls = ({
  setIsExtraOptionsVisible,
  setListGridToggle,
}) => {
  const navigateHook = useNavigate();
  // Store the navigate function in MobX due to hook limitations
  useEffect(() => {
    navigate.setNavigate(navigateHook);
  }, []);
  return (
    <div className="homeControls">
      <button className="buttonListGridToggle">
        <select
          className="selectListGridToggle"
          onChange={(e) => setListGridToggle(e.target.value)}
        >
          <option>List</option>
          <option>Grid</option>
        </select>
      </button>
      <button
        className="eomOpenBtn"
        onClick={() => setIsExtraOptionsVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          width={30}
          height={30}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <div className="pageButtons">
        <button
          onClick={() => {
            const currentPage = Number(page.page);
            const previousPage = currentPage - 1;
            if (currentPage > 1) {
              page.setPage(previousPage);
              navigate.navigate(
                `/allvehicles?page=${previousPage}&size=10` +
                  queryParams.queryParams
              );
            }
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1>
          {page.page}/{page.lastPage}
        </h1>
        <button
          onClick={() => {
            const currentPage = Number(page.page);
            const nextPage = currentPage + 1;
            console.log(nextPage);
            if (currentPage < page.lastPage) {
              page.setPage(nextPage);
              navigate.navigate(
                `/allvehicles?page=${nextPage}&size=10` +
                  queryParams.queryParams
              );
            }
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default observer(ExtraOptionsControls);
