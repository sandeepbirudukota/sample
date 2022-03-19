import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Form from "./Form";
import Redirect from "../Redirect/Redirect";
import axios from "axios";
import Cookies from "js-cookie";
import ShopItems from "./ShopItems";

export default function Shop() {
  const [add, setAdd] = useState(false);

  const [userData, setUserData] = useState([]);
  const [addImage, setAddImage] = useState("");
  const [addName, setAddName] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [force, setForce] = useState(false);

  const shop = userData.shop;

  useEffect(() => {
    async function getUserData() {
      const response = await axios.get("http://localhost:3001/getuserdata", {
        params: { user: Cookies.get("username") },
      });
      setUserData(response.data[0]);
    }

    getUserData();
    console.log(userData.name);
  }, []);

  const toggleAdd = () => {
    setAdd(!add);
  };

  const additem = () => {
    const data = {
      shop: shop,
      name: addName,
      category: addCategory,
      description: addDescription,
      price: addPrice,
      quantity: addQuantity,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://127.0.0.1:3001/additem", data).then((response) => {
      if (response.data === "SUCCESS") {
        console.log("Status Code : ", response.status);
        setAdd(false);
        setAddName("");
        setAddCategory("");
        setAddDescription("");
        setAddPrice("");
        setAddQuantity("");
        setForce(true);
      }
      if (response.data === "UNSUCCESS") {
        console.log(response.data);
      }
    });
  };

  return (
    <>
      <Redirect />
      <Navbar />

      <div className="container">
        <div className="row" style={{ borderBottom: "1px solid" }}>
          <div className="col col-md-2">
            <img />
          </div>
          <div className="col col-md-3">
            <h1>{userData.shop}</h1>

            <a
              className="btn btn-light default-button"
              role="button"
              onClick={toggleAdd}
            >
              Add Items
            </a>
          </div>
          <div className="col col-md-2 offset-5">
            <h4>Store Owner Details</h4>
            <p>Owner Name: {userData.name}</p>
            <p>Owner Email: {userData.email}</p>
            <p>Owner Phone: {userData.phone}</p>
          </div>
        </div>
        {add && (
          <div className="modal-custom">
            <div onClick={toggleAdd} className="overlay-custom"></div>
            <div className="modal-content">
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8 offset-1">
                  <h2>Add an item.</h2>
                </div>
                <div className="col-md-1 justify-content-end">
                  <a className="btn mt-2" role="button" onClick={toggleAdd}>
                    ❌
                  </a>
                </div>
              </div>
              <div className="row profile-row justify-content-center">
                <div className="col-md-8">
                  <label className="form-label">Item Image</label>
                  <div className="avatar">
                    <div className="avatar-bg center"></div>
                  </div>
                  <input
                    className="form-control"
                    type="file"
                    name="avatar-file"
                    value={addImage}
                    onChange={(e) => setAddImage(e.target.value)}
                  />
                </div>
              </div>
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8">
                  <label className="form-label">Item Name</label>
                  <input
                    className="form-control"
                    type="text"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    defaultValue={""}
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                  >
                    <option value="">SELECT CATEGORY</option>
                    <option value="Clothing & Shoes">Clothing & Shoes</option>
                    <option value="Computers">Computers</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Entertainment & Arts">
                      Entertainment & Arts
                    </option>
                    <option value="Food & Gifts">Food & Gifts</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                  </select>
                </div>
              </div>
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8">
                  <label className="form-label">Price</label>
                  <input
                    className="form-control"
                    type="number"
                    value={addPrice}
                    onChange={(e) => setAddPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8">
                  <label className="form-label ">Description</label>
                  <textarea
                    className="form-control"
                    value={addDescription}
                    onChange={(e) => setAddDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row profile-row justify-content-center mt-2">
                <div className="col-md-8">
                  <label className="form-label">Quantity</label>
                  <input
                    className="form-control"
                    type="number"
                    value={addQuantity}
                    onChange={(e) => setAddQuantity(e.target.value)}
                  />
                </div>
              </div>
              <a
                className="btn default-button mt-3"
                role="button"
                onClick={additem}
              >
                Add
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 " style={{ borderBottom: "1px solid" }}>
            <h3>Sales Details</h3>
          </div>
          <div className="col-md-12 mt-3">
            <h1>Items</h1>
          </div>
        </div>

        <div className="row mt-5">
          {shop ? <ShopItems shop={shop} update={force} /> : ""}
        </div>
      </div>
    </>
  );
}
