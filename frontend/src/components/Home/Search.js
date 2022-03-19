import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

export default function Search() {
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState(false);
  const toggleSort = () => {
    setSort(!sort);
  };
  const toggleFilter = () => {
    setFilter(!filter);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3">
            <h2>Search Result</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 mt-3 offset-8">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                onClick={toggleSort}
              >
                Sort By
              </button>

              {sort && (
                <div
                  className="dropdown"
                  aria-labelledby="dropdownMenuButton"
                  style={{ border: "1px solid #6C757D" }}
                >
                  <a
                    className="dropdown-item"
                    href="#nogo"
                    onClick={toggleSort}
                  >
                    Price
                  </a>
                  <a
                    className="dropdown-item"
                    href="#nogo"
                    onClick={toggleSort}
                  >
                    Quantity
                  </a>
                  <a
                    className="dropdown-item"
                    href="#nogo"
                    onClick={toggleSort}
                  >
                    Sales
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-2 mt-3">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                onClick={toggleFilter}
              >
                Filter
              </button>

              {filter && (
                <div
                  className="dropdown"
                  aria-labelledby="dropdownMenuButton"
                  style={{ border: "1px solid #6C757D" }}
                >
                  <a
                    className="dropdown-item"
                    href="#nogo"
                    onClick={toggleFilter}
                  >
                    {"<50$"}
                  </a>
                  <a
                    className="dropdown-item"
                    href="#nogo"
                    onClick={toggleFilter}
                  >
                    {">50$<100$"}
                  </a>
                  <a
                    className="dropdown-item"
                    href="#nogo"
                    onClick={toggleFilter}
                  >
                    {">100$"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
