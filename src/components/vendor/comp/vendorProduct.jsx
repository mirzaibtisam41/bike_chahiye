import { CircularProgress } from "@mui/material";
import axios from "axios";
import commaNumber from "comma-number";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSellerProductApi, serverURL } from "../../../common/api";
import VendorHero from "./VendorHero";
import "./VendorProduct.css";
import BasicPagination from "../../useBikes/Pagination";

const VendorDetail = ({ heading, success }) => {
  const navigate = useNavigate();
  const { vendorList } = useSelector((state) => state.user);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const _filter = list?.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    getVendordata(id);
    getProductsByVendors(id);
  }, []);

  const getVendordata = (id) => {
    const find = vendorList?.find((item) => item._id === id);
    setVendor(find);
  };

  const getProductsByVendors = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.post(getSellerProductApi, { owner: id });
      if (data) {
        setLoading(false);
        setList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main mt-5 mb-5">
      <section>
        <VendorHero vendor={vendor} />
      </section>

      {heading !== false && (
        <section className="container text-center mt-5 mb-5">
          <span
            className=" h2 bold"
            style={{ borderBottom: "3px solid #dc3545", color: "black" }}
          >
            {success ? success : "LISTED VENDOR PRODUCT"}
          </span>
        </section>
      )}
      {loading ? (
        <div>
          <CircularProgress style={{ color: "#dc3545" }} />
        </div>
      ) : (
        <div>
          {list?.length <= 0 ? (
            <div className="text-center text-danger">
              <span>No Products Available</span>
            </div>
          ) : (
            <div className="list-parent">
              {_filter?.map((item, index) => (
                <div
                  key={index}
                  className=" p-2"
                  onClick={() => navigate(`/productdetailpage/${item?._id}`)}
                >
                  <div className="card">
                    <img
                      src={`${serverURL}${item?.productPic[0]}`}
                      className="card-img-top"
                      style={{ height: "240px" }}
                      alt="image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item?.name}</h5>
                      <p className="card-text justify text-secondary">
                        {item?.detail?.length > 210
                          ? `${item?.detail?.substring(0, 210)}...`
                          : `${item?.detail?.substring(0, 210)}`}
                      </p>
                      <p className="card-text fw-bold">
                        {commaNumber(item?.price)} pkr
                      </p>
                      <a
                        className="btn btn-secondary"
                        style={{ backgroundColor: "#dc3545" }}
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mb-4">
        {list?.length > 0 && (
          <BasicPagination
            total={list?.length}
            postPerPage={postsPerPage}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default VendorDetail;
