import { CircularProgress } from "@mui/material";
import React from "react";
import Carousel from "react-elastic-carousel";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";

const MostRelatedProduct = ({ heading, success, storeProducts, serverURL, loading }) => {
  const navigate = useNavigate();
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  return (
    <div className="mt-5 mb-5 " >
      {heading !== false && (
        <section className="container text-center mt-4">
          <span
            className=" h2 bold"
            style={{ borderBottom: "3px solid #dc3545", color: "black" }}
          >
            {success ? success : "FEATURED PRODUCTS"}
          </span>
          <div
            className={success ? "my-4" : "mx-auto my-2 service-text"}

          >
            {!success && (
              <span className="text-center mt-2 mb-4">
              </span>
            )}
          </div>
        </section>
      )}
      {
        loading
          ?
          <div className="mt-2">
            <CircularProgress style={{ color: "#dc3545" }} />
          </div>
          :
          <section style={{ margin: '0px 50px' }} className="mt-5 services-page card-page shadow-md py-2 ">
            <div className="carousel-wrapper w-100">
              <Carousel breakPoints={breakPoints}>
                {storeProducts?.length > 0 &&
                  storeProducts?.filter(item => item.active === true && item.featuredProduct === true)
                    .map((item, index) => {
                      return (
                        <div key={index} className="card mx-2">
                          <LazyLoadImage
                            effect="blur"
                            className="card-img-top" s
                            src={`${serverURL}${item?.productPic}`}
                            alt="Card cap"
                            style={{
                              height: '235px'
                            }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item?.name}</h5>
                            <p className="card-text justify">
                              {item?.detail?.substring(0, 120)}...
                            </p>
                            <div className="flex align-items-center justify-content-between bd-highlight">
                              <section className="flex align-items-center" style={{ flexGrow: 2, alignItems: 'center' }}>
                                <i className="col-2 bi bi-geo-alt"></i>
                                <span className="col">Gulberg, Lahore</span>
                              </section>
                              <button className="btn btn-danger mt-3"
                                onClick={() =>
                                  navigate(`/productdetailpage/${item._id}`)
                                }
                              >See Details</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </Carousel>
            </div>
          </section>
      }
    </div>
  );
};

export default MostRelatedProduct;