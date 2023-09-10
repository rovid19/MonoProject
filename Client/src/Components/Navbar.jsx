import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbarComponent">
      <div className="navbar20">
        <h1 style={{ color: "var(--neutral-300)" }}> Vehicles </h1>
      </div>
      <nav className="navbar80">
        <ul style={{ height: "100%", width: "100%", padding: "8px" }}>
          <li className="navbarLi">
            <span className="navbarIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                width={35}
                height={25}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </span>
            <Link to="/" className="link">
              All Vehicles
            </Link>
          </li>
          <li className="navbarLi">
            <span className="navbarIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                width={35}
                height={25}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <Link to="/addvehicle" className="link">
              Add Vehicle
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
