import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../common/api";
import Carousals from "../body/Carousel/carousal";
import BasicPagination from "../useBikes/Pagination";
import "./vendor.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const VendorList = ({ heading, success }) => {
  const navigate = useNavigate();
  const { vendorList } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const _filter = vendorList?.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className=" mb-5">
      <Carousals />
      <section className="vendor mt-5 mb-3">
        {heading !== false && (
          <section className="container text-center mt-4 mb-3">
            <span
              className=" h2 bold"
              style={{ borderBottom: "3px solid #dc3545", color: "black" }}
            >
              {success ? success : "REGISTERED FRANCHISE"}
            </span>
          </section>
        )}
        <div
          className="d-flex flex-wrap m-auto justify-content-start"
          style={{ width: "82%" }}
        >
          {_filter?.map((item, index) => (
            <div
              key={index}
              className="row col-md-4 col-sm-4 d-flex m-auto p-3 d-flex justify-content-start"
            >
              <div
                className=" p-3 border"
                onClick={() => navigate(`/vendordetailpage/${item?._id}`)}
              >
                <div className="card bg-dark text-white">
                  <LazyLoadImage
                    effect="blur"
                    src={`${serverURL}${item?.image}`}
                    className="card-img"
                    alt="..."
                  />
                  <div className="card-img-overlay">
                    <h5 className="card-title text-uppercase">
                      {item?.shopName}
                    </h5>
                  </div>
                </div>
                <p
                  className="card-text p-2 d-flex items-center"
                  style={{
                    color: "sienna",
                    textTransform: "capitalize",
                    minHeight: "65px",
                  }}
                >
                  <i
                    style={{ marginRight: "10px" }}
                    className="fa-sharp fa-solid fa-location-dot fa-2x"
                  ></i>
                  {item?.address
                    ? `${item?.address?.location}${", "}${item?.address?.city}`
                    : "Not Specified"}
                </p>
                <section className="card-p">
                  <h5 className="text-danger bold">Contact:</h5>
                  <span className="card-text">
                    <span className="text-success bold">Phone: </span>
                    {item?.phone}
                  </span>
                  <p className="card-text">
                    <span className="text-success bold">Email: </span>
                    {item?.email}
                  </p>
                  <div className="text-secondary">
                    <span>Registered- </span>
                    {moment(item?.createdAt).format("LL")}
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mb-4">
        {vendorList?.length > 0 && (
          <BasicPagination
            total={vendorList?.length}
            postPerPage={postsPerPage}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default VendorList;
