import React from "react";
import Navbar from "../Navbar/Navbar";
import Redirect from "../Redirect/Redirect";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";
import SearchProductList from "./SearchProductList";
import Search from "./Search";

export default function Home({ userData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get("search");
  return (
    <>
      <Navbar />
      <div className="container">
        {search ? (
          <Search />
        ) : (
          <div>
            <div className="row">
              <div className="col-md-4 mt-3 offset-4">
                <h1>Welcome, {userData.name}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-3">
                <h1>Popular</h1>
              </div>
            </div>
          </div>
        )}
        <div className="row mt-5">
          {search ? <SearchProductList keyword={search} /> : <ProductList />}
        </div>
      </div>
    </>
  );
}
