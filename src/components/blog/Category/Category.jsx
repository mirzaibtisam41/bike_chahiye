import React from "react";
import "./Category.css";
import ListItems from "./ListItems";
import ListItems1 from "./ListItems1";
import CategoryList from "./CategoryList";
import img1 from "../img/martin.jpg";
const Category = ({ blogData, array, page }) => {
  return (
    <div>
      <section className="d-flex justify-content-end align-items-center"></section>
      <section
        className="mt-3 shadow-sm border"
        style={{ backgroundColor: "white" }}
      >
        <p
          style={{ fontSize: "20px", fontWeight: "700", fontFamily: "Roboto" }}
          className="text-uppercase m-0 text-dark text-center py-2"
        >
          Recommended Posts
        </p>
        <div className="list-container ">
          <ListItems array={array} blogData={blogData} />
        </div>
      </section>

      <section
        className="mt-3 shadow-sm border sec"
        style={{ backgroundColor: "white" }}
      >
        <p
          style={{ fontSize: "22px", fontWeight: "700", fontFamily: "Roboto" }}
          className="text-uppercase m-0 text-dark text-center py-2"
        >
          related posts
        </p>
        <div className="list-container ">
          <ListItems1 array={array} blogData={blogData} />
        </div>
      </section>
      {!page === "post" && (
        <section>
          <div className="middle-card border mt-4">
            <div className="overlay d-flex align-items-center">
              <div className="mx-3 w-100 my-3 text-center">
                <h6 className="text-uppercase join-network heading-middle fw-bold">
                  join our network today
                </h6>
                <div className="text-center">
                  <span className="span-join">
                    Subscribe our news letter and stay
                    <br />
                    up-to-date with latest promotions,
                    <br />
                    new product and amazing sales
                  </span>
                </div>
                <div className="text-center mt-2">
                  <input
                    className="input-email"
                    type="email"
                    placeholder="email"
                  />
                  <br />
                  <button
                    style={{ width: "13rem" }}
                    className="btn mt-2 btn-method btn-danger text-capitalize"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Category;
