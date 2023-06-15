import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MostRelatedProduct = ({
  heading,
  success,
  product,
  serverURL,
  setID,
}) => {
  const navigate = useNavigate();
  const storeProducts = useSelector((state) => state.products.products);
  const storeSpareParts = useSelector((state) => state.products.spareParts);

  const [products, setProducts] = useState([]);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  useEffect(() => {
    if (window.location.search) {
      const _filter = storeSpareParts?.filter(
        (item) => item?._id !== product?._id
      );
      setProducts(_filter);
    } else {
      const _filter = storeProducts?.filter(
        (item) => item?.brand === product?.brand && item?._id !== product?._id
      );
      setProducts(_filter);
    }
  }, [product]);

  return (
    <div className="mt-5 mb-5 ">
      {heading !== false && (
        <section className="container text-center mt-4">
          <span
            className=" h2 bold"
            style={{ borderBottom: "3px solid #dc3545", color: "black" }}
          >
            {success ? success : "MOST RELATED PRODUCT"}
          </span>
          <div
            className={success ? "my-4" : "mx-auto my-2 service-text"}
            style={{ width: "27rem" }}
          >
            {!success && <span className="text-center"></span>}
          </div>
        </section>
      )}
      {products?.length > 0 ? (
        <section className="container services-page card-page shadow-md py-2 mt-5">
          <div className="carousel-wrapper w-100">
            <Carousel breakPoints={breakPoints}>
              {products.map((item, index) => {
                return (
                  <div key={index} className="card mx-2">
                    {window.location.search ? (
                      <LazyLoadImage
                        effect="blur"
                        className="card-img-top"
                        style={{ height: "225px" }}
                        src={`${serverURL}${item?.partPic[0]}`}
                        alt="Card cap"
                      />
                    ) : (
                      <LazyLoadImage
                        effect="blur"
                        className="card-img-top"
                        style={{ height: "225px" }}
                        src={`${serverURL}${item?.productPic[0]}`}
                        alt="Card cap"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{item?.name}</h5>
                      <p className="card-text justify">
                        {item?.detail?.substring(0, 120)}...
                      </p>
                      <div className="flex align-items-center justify-content-between bd-highlight">
                        <section
                          className="flex align-items-center"
                          style={{ flexGrow: 2, alignItems: "center" }}
                        >
                          <i className="col-2 bi bi-geo-alt"></i>
                          <span className="col">Gulberg, Lahore</span>
                        </section>
                        <button
                          className="btn btn-danger mt-3"
                          onClick={() => {
                            if (window.location.search) {
                              navigate(
                                `/productdetailpage/${item._id}?category=spareParts`
                              );
                            } else {
                              navigate(`/productdetailpage/${item._id}`);
                            }
                            setTimeout(() => {
                              setID(item?._id);
                              window.scrollTo(0, 300);
                            }, 1000);
                          }}
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </section>
      ) : (
        <span className="bold text-danger" style={{ position: "relative", top: "20px" }}>
          No Related Products Available
        </span>
      )}
    </div>
  );
};

export default MostRelatedProduct;
