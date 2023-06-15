import {
  Autocomplete,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsedBikeApi,
  getAllUsedBikeBySearchApi,
  getSparePartsApi,
  usedBikeFilterByPriceApi,
} from "../../common/api";
import { setSparePartsProducts } from "../../redux/reducers/productSlice";
import Card from "./Card";
import Pagination from "./Pagination";
import "./style.css";

const ListItems = ({ }) => {
  const dispatch = useDispatch();
  const dataType = useSelector((state) => state.products.route);
  const { brands } = useSelector((state) => state.products);
  const [products, setProdcuts] = useState([]);
  const [helpProducts, setHelpProdcuts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [allBrands, setAllBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    setSearch("");
    if (dataType === "spareParts") {
      getSparePartsList();
    } else {
      getUsedBikeList();
      const _map = brands?.map((item) => {
        return { label: item?.brand };
      });
      setAllBrands(_map);
    }
  }, [dataType]);

  const getUsedBikeList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        search ? `${getAllUsedBikeBySearchApi}/${search}` : getAllUsedBikeApi
      );
      if (data) {
        console.log(data);
        setLoading(false);
        setProdcuts(data);
        setHelpProdcuts(data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error in fetching bikes ...!", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const getSparePartsList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(getSparePartsApi);
      if (data) {
        setLoading(false);
        setProdcuts(data?.Products);
        setHelpProdcuts(data?.Products);
        dispatch(setSparePartsProducts(data?.Products));
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error in fetching spare parts ...!", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const _filter = products?.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const filterByPrice = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${usedBikeFilterByPriceApi}?minPrice=${minPrice}&maxPrice=${maxPrice}`)
      if (data) {
        setLoading(false);
        setProdcuts(data);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const filterBySearch = (search) => {
    const _filterProducts = helpProducts?.filter((item) => {
      return `${item?.brand} ${item?.category} ${item?.name}`
        ?.toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase());
    });
    setProdcuts(_filterProducts);
  };

  const filterByTypes = (type) => {
    setType(type);
    if (type === "All") {
      setType('All Types');
      setProdcuts(helpProducts);
      setHelpProdcuts(helpProducts);
    } else {
      const filterTypes = helpProducts?.filter((item) => item.types === type);
      setProdcuts(filterTypes);
    }
  };

  const allFilters = () => {
    const _filterProducts = helpProducts?.filter((item) => {
      return (
        `${item?.brand} ${item?.category} ${item?.name}`
          ?.toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase()) && item?.types == type
      );
    });
    setProdcuts(_filterProducts);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="text-center bygga-parent equip-parent py-3">
        <section className="container text-center mt-4">
          <span
            className="h2 bold"
            style={{ borderBottom: "3px solid #dc3545", color: "black" }}
          >
            {dataType === "spareParts" ? "BIKES SPARE PARTS" : "USED BIKES"}
          </span>
        </section>
      </section>
      {/*  */}
      <div className="bg-white main-brand" style={{ margin: "0px 50px" }}>
        <section className="d-flex justify-content-between" style={{ margin: "0px 50px" }}>
          <div>
            <span className="h4 bold text-danger">Filter: </span>
            <span className="h4 bold text-success">{`${type}${" "}(${products?.length})`}</span>
          </div>
          <div className="btn-group mb-3" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" onClick={() => filterByTypes('All')}>All Types</button>
            <button type="button" className="btn btn-secondary" onClick={() => filterByTypes('Bike Equipments')}>Bike Equipments</button>
            <button type="button" className="btn btn-secondary" onClick={() => filterByTypes('Bike OutFits')}>Bike OutFits</button>
          </div>
        </section>
        <section className="d-flex sec-parent">
          {
            dataType !== "spareParts" &&
            <div className="child_1" style={{ width: "25%" }}>
              <div className="col-md-12 col-sm-12 d-flex flex-wrap border">
                <div className="mb-3 d-flex justify-content-start align-items-center">
                  <h5
                    className="d-flex justify-content-between"
                    style={{ paddingLeft: "1rem" }}
                  >
                    Products
                  </h5>
                  <h5 className="p-2 text-muted">{`(${products?.length})`}</h5>
                </div>
                <div className="mb-3">
                  <h5 className="d-flex justify-content-start text-muted px-3">
                    Price
                  </h5>
                  <div className="d-flex">
                    <span>
                      <input
                        type="number"
                        placeholder="from"
                        className="w-75 rounded-pill m-1 text-center"
                        v-model="minPrice"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </span>

                    <div
                      className="m-1"
                      style={{ borderLeft: "3px solid #ddd" }}
                    ></div>
                    <span>
                      <input
                        type="number"
                        placeholder="to"
                        className="w-75 rounded-pill m-1 text-center"
                        v-model="maxPrice"
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) filterByPrice();
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="w-100 p-3">
                  <h5 className="d-flex justify-content-start text-muted">
                    Product Filter
                  </h5>
                  {dataType === "spareParts" ? (
                    <div
                      style={{
                        marginTop: "1rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Search SparePart"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[
                          // { label: "All" },
                          { label: "Bike Equipments" },
                          { label: "Bike OutFits" },
                        ]}
                        sx={{ width: "100%", marginTop: "10px" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Types" />
                        )}
                        onChange={(e, v) => setType(v.label)}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={allBrands}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Brands" />
                        )}
                        onChange={(e, v) => filterBySearch(v.label)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
          <div className="child_2" style={{ width: dataType !== "spareParts" ? "75%" : '100%' }}>
            {!loading && products?.length === 0 && (
              <Container
                className="text-danger"
                style={{ padding: "0rem 0rem 1rem 0px" }}
              >
                <Typography>No Bike Available Yet</Typography>
              </Container>
            )}
            {loading ? (
              <div className="mt-2">
                <CircularProgress style={{ color: "#dc3545" }} />
              </div>
            ) : (
              <>
                {" "}
                <Container
                  className="main-use-bikes"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "1.5rem",
                  }}
                >
                  {_filter?.length > 0 &&
                    _filter?.map((item) => {
                      return (
                        <Card key={item._id} bike={item} dataType={dataType} />
                      );
                    })}
                </Container>
                {products?.length > 0 && (
                  <Container style={{ marginBottom: "15px" }}>
                    <Pagination
                      total={products?.length}
                      postPerPage={postsPerPage}
                      handleChange={handleChange}
                    />
                  </Container>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ListItems;
