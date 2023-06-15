import commaNumber from "comma-number";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverURL, productFilterByPriceApi } from "../../common/api";
import { calculateRatings } from "../../common/func";
import "../css/component.css";
import TopSeller from "../home/TopSeller/TopSeller";
import SuccessStory from "../sucessStory/index";
import BasicPagination from "../useBikes/Pagination";
import BrandPoster from "./brandPoster/brandPoster";
import Carousels from "./Carousel/carousal";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import axios from "axios";

const Body = () => {
  const navigate = useNavigate();
  const storeProducts = useSelector((state) => state.products.products);
  const { brands } = useSelector((state) => state.products);

  const [stateIndex, setIndex] = useState("");
  const [subIndex, setSubIndex] = useState("");

  const [products, setProducts] = useState(storeProducts);
  const [loading, setLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [cat, setCategory] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const _category = window.location.search.split("=")[1];
    setSubIndex(_category);
    const _brand = window.location.pathname
      .split("/")[2]
      .split("%20")
      .join(" ");
    filterByBrand(_brand, _category);
    setIndex(_brand);
  }, []);

  const filterByBrand = (brand, category) => {
    if (brand == "All") {
      setProducts(storeProducts);
      setIndex(-1);
    } else {
      const _filter = storeProducts?.filter(
        (item) => item.brand.toLowerCase() === brand.toLowerCase()
      );
      if (category) {
        const _filterByCatyegory = _filter?.filter(
          (item) => item?.category[0].toLowerCase() === category.toLowerCase()
        );
        setProducts(_filterByCatyegory);
      } else {
        setProducts(_filter);
      }
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const _filter = products?.slice(indexOfFirstPost, indexOfLastPost);

  const _filterBrands = brands?.filter((item) =>
    item?.brand.toLowerCase().includes(cat?.toLowerCase())
  );

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Carousels />
      <section className="text-center bygga-parent equip-parent py-3">
        <section className="container text-center">
          <span
            className=" h2 bold"
            style={{ borderBottom: "3px solid #dc3545", color: "black" }}
          >
            New Bikes
          </span>
        </section>
      </section>
      <div className="py-3 bg-white main-brand" style={{ margin: "0px 50px" }}>
        <section className="d-flex sec-parent">
          {!loading ? (
            <>
              <div className="child_1" style={{ width: "25%" }}>
                <div class="col-md-12 col-sm-12 d-flex flex-wrap border">
                  <div class="mb-3 d-flex justify-content-start align-items-center">
                    <h5
                      class="d-flex justify-content-between"
                      style={{ paddingLeft: "1rem" }}
                    >
                      Products
                    </h5>
                    <h5 class="p-2 text-muted">{`(${products?.length})`}</h5>
                  </div>
                  <div class="mb-3">
                    <h5 class="d-flex justify-content-start text-muted px-3">
                      Price
                    </h5>
                    <div class="d-flex">
                      <span>
                        <input
                          type="number"
                          placeholder="from"
                          class="w-75 rounded-pill m-1 text-center"
                          v-model="minPrice"
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </span>

                      <div
                        class="m-1"
                        style={{ borderLeft: "3px solid #ddd" }}
                      ></div>
                      <span>
                        <input
                          type="number"
                          placeholder="to"
                          class="w-75 rounded-pill m-1 text-center"
                          v-model="maxPrice"
                          onChange={(e) => setMaxPrice(e.target.value)}
                          onKeyDown={async (e) => {
                            if (e.keyCode === 13) {
                              setFLoading(true);
                              try {
                                const { data } = await axios.get(`${productFilterByPriceApi}?minPrice=${minPrice}&maxPrice=${maxPrice}`)
                                if (data) {
                                  setFLoading(false);
                                  setProducts(data);
                                }

                              } catch (error) {
                                setFLoading(false);
                                console.log(error);
                              }
                            }
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div class="w-100 p-3 mb-2">
                    <h5 class="d-flex justify-content-start text-muted">
                      Product Categories
                    </h5>

                    <div class="d-flex m-auto pb-2">
                      <input
                        placeholder="Product Categories..."
                        style={{ cursor: "pointer" }}
                        type="text"
                        class="w-100 rounded-pill m-1 text-center"
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      {_filterBrands?.map((item, index) => {
                        return (
                          <>
                            <span
                              className="brand-span"
                              onClick={() => {
                                if (stateIndex === item?.brand) {
                                  setIndex("");
                                } else {
                                  setIndex(item?.brand);
                                }
                              }}
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px",
                                color: stateIndex === item?.brand && "#dc3545",
                              }}
                            >
                              {item?.brand}
                            </span>
                            {stateIndex === item?.brand && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginLeft: "10px",
                                }}
                              >
                                {item?.power?.map((p, x) => {
                                  return (
                                    <span
                                      className="power-span"
                                      onClick={() => {
                                        setSubIndex(p?.power);
                                        filterByBrand(item?.brand, p?.power);
                                      }}
                                      style={{
                                        color:
                                          stateIndex == item?.brand &&
                                          subIndex == p?.power &&
                                          "green",
                                      }}
                                    >
                                      {p?.power}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>

                    <div class="d-flex justify-content-center m-1">
                      <button
                        className=" ml-3 btn btn-danger"
                        onClick={() => {
                          filterByBrand("All");
                        }}
                      >
                        View All
                      </button>
                    </div>

                    <a
                      href="javascript:void(0)"
                      style={{ color: "#29b574", fontSize: "16px" }}
                      class="d-flex justify-content-start"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="child_2" style={{ width: "75%" }}>
                {
                  floading ? <ClipLoader />
                    :
                    <>
                      <div
                        style={{
                          height: "100%",
                          position: "relative",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gridGap: "1.5rem",
                        }}
                        className="containers px-4"
                      >
                        {_filter?.length > 0 ? (
                          _filter
                            .filter((item) => item.active === true)
                            .map((product, index) => (
                              <div
                                key={index}
                                style={{ height: "fit-content" }}
                                className="product p-3 bd-highlight bg-white b-radius border"
                              >
                                <div
                                  className=" mb-auto bd-highlight"
                                  style={{ height: "185px" }}
                                >
                                  <LazyLoadImage
                                    effect="blur"
                                    className="img-fluid mb-4 b-radius"
                                    src={`${serverURL}${product.productPic}`}
                                    alt="Picture"
                                    style={{ height: "185px" }}
                                  />
                                </div>
                                <div className="bd-highlight">
                                  <h5 className="bold">{product?.name}</h5>
                                </div>
                                <div
                                  className="bd-highlight justify"
                                  style={{ minHeight: "60px" }}
                                >
                                  <span>{product?.detail?.substring(0, 60)}...</span>
                                </div>
                                <div
                                  className="bd-highlight"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div className="m-1">
                                    <span
                                      className={
                                        calculateRatings(product) > 1
                                          ? "fa fa-star checked"
                                          : "fa fa-star"
                                      }
                                    ></span>
                                    <span
                                      className={
                                        calculateRatings(product) >= 2
                                          ? "fa fa-star checked"
                                          : "fa fa-star"
                                      }
                                    ></span>
                                    <span
                                      className={
                                        calculateRatings(product) >= 3
                                          ? "fa fa-star checked"
                                          : "fa fa-star"
                                      }
                                    ></span>
                                    <span
                                      className={
                                        calculateRatings(product) >= 4
                                          ? "fa fa-star checked"
                                          : "fa fa-star"
                                      }
                                    ></span>
                                    <span
                                      className={
                                        calculateRatings(product) === 5
                                          ? "fa fa-star checked"
                                          : "fa fa-star"
                                      }
                                    ></span>
                                  </div>

                                  <span
                                    style={{
                                      color: "seaGreen",
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      justifyContent: "space-around",
                                      display: "flex",
                                    }}
                                  >
                                    <i
                                      className="fa fa-cube fa-1x mt-2"
                                      aria-hidden="true"
                                    ></i>
                                    <span className="m-1">inStock</span>
                                  </span>
                                </div>

                                <div className=" d-flex justify-content-between">
                                  <span className="bold">
                                    Location :
                                    <span style={{ color: "red" }}> Lahore </span>{" "}
                                  </span>

                                  <span
                                    className="bold"
                                    style={{ color: "green", fontSize: "12px" }}
                                  >
                                    <span icon="fa-solid fa-cubes"> </span>
                                  </span>
                                </div>
                                <div className="bd-highlight">
                                  <div className="row mt-4 d-flex align-items-center">
                                    <h6
                                      className="col m-0 bold"
                                      style={{ textAlign: "left" }}
                                    >
                                      {commaNumber(product?.price)} PKR
                                    </h6>
                                    <button
                                      style={{ width: "125px" }}
                                      className="btn btn-danger"
                                      onClick={() =>
                                        navigate(`/productdetailpage/${product._id}`)
                                      }
                                    >
                                      Buy Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p
                            className="h3 text-danger w-100"
                            style={{ position: "absolute", top: "50%" }}
                          >
                            No Products Available
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        {products.length > 0 && (
                          <BasicPagination
                            total={products?.length}
                            postPerPage={postsPerPage}
                            handleChange={handleChange}
                          />
                        )}
                      </div>
                    </>
                }
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center pb-5">
              <ClipLoader />
            </div>
          )}
        </section>
      </div>
      <FeaturedProduct
        storeProducts={storeProducts}
        serverURL={serverURL}
        loading={false}
      />
      <TopSeller />
      <SuccessStory />
      <hr />
      <BrandPoster />
    </div>
  );
};

export default Body;
