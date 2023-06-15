import React from "react";
import "./FHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoute } from "../../../redux/reducers/productSlice";

const FHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="main-container text-white bold">
      <div className="container sub-container d-flex justify-content-center align-items-center">
        <section className="FH-Div d-flex ">
          <i className="fa fa-phone ms-2 bold" aria-hidden="true"></i>
          <span className="mx-2 bold">+92 301-4999590</span>
        </section>

        <section className="FH-Div bold d-flex justify-content-between align-items-center text-uppercase">
          <span
            onClick={() => {
              dispatch(setRoute("useBikes"));
              navigate("/usebikes");
            }}
          >
            Use Bikes
          </span>{" "}
          <span onClick={() => navigate("/vendorlist")}>Find a Dealer</span>
          <span onClick={() => navigate("/help&support")}>Help & Support</span>
          <div onClick={() => navigate("/login")}>Login</div>
        </section>
      </div>
    </div>
  );
};

export default FHeader;
