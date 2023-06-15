import axios from "axios";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBrandsApi } from "../../../common/api";
import { setAllBrands, setRoute } from "../../../redux/reducers/productSlice";
import "../../css/component.css";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { logoutUser } from "../../../redux/reducers/user";

const Navbars = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.products);
  const storeCart = useSelector((state) => state.products.cart);
  const storeWishList = useSelector((state) => state.products.wishList);
  const User = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = async () => {
    try {
      const { data } = await axios.get(getAllBrandsApi);
      if (data) {
        dispatch(setAllBrands(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar bg="white" expand="lg" className="col-11 p-2 d-flex m-auto">
      <Container fluid>
        <div className="col-2 d-flex align-items-center justify-content-center">
          <img
            src="/images/pkBikes.png"
            alt="PK Bikes"
            className="logo"
            style={{ width: "150px", height: "120px" }}
            onClick={() => navigate("/")}
          />
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="nav navbar col-8 me-auto my-2 my-lg-0 d-flex m-auto"
            style={{ maxHeight: "100%", color: "red" }}
          >
            <div
              className="col-12"
              style={{
                borderRight: "3px solid black",
                borderLeft: "3px solid black",
              }}
            >
              <div className="row p-3 d-flex justify-content-between">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-dark" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="row ">
                  <div className="navbar-nav ">
                    <a
                      className="nav-item nav-link m-2 bold"
                      onClick={() => navigate("/")}
                    >
                      Home
                    </a>

                    <Dropdown className="mt-2 bold">
                      <Dropdown.Toggle
                        className=" bold mt-1"
                        style={{
                          backgroundColor: "white",
                          border: "none",
                          color: "black",
                        }}
                        id="dropdown-basic"
                      >
                        Brand
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ color: "black", width: "100%" }}>
                        {brands?.map((item, index) => {
                          return (
                            <Dropdown className="mb-2" key={index}>
                              <Dropdown.Toggle
                                style={{
                                  backgroundColor: "white",
                                  color: "black",
                                  border: "none",
                                }}
                                id="dropdown-basic1"
                              >
                                {item?.brand}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {item?.power?.map((power) => {
                                  return (
                                    <Dropdown.Item
                                      onClick={() =>
                                        navigate(
                                          `/brand/${item?.brand}?category=${power?.power}`
                                        )
                                      }
                                    >
                                      {power?.power}
                                    </Dropdown.Item>
                                  );
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                    <a
                      className="nav-item nav-link m-2 bold"
                      onClick={() => {
                        dispatch(setRoute("spareParts"));
                        navigate("/spareParts");
                      }}
                    >
                      Spare Parts
                    </a>
                    <a
                      className="nav-item nav-link m-2 bold"
                      onClick={() => navigate("/advancebooking")}
                    >
                      Advance Booking
                    </a>
                    <a
                      className="nav-item nav-link m-2 bold"
                      onClick={() => navigate("/news")}
                    >
                      News
                    </a>
                    <a
                      className="nav-item nav-link m-2 bold"
                      onClick={() => navigate("/aboutus")}
                    >
                      Aboutus
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Nav>

          <div className="leftDiv w-100 d-flex m-auto align-items-center ">
            <div
              className=" d-flex  header-icon w-50 "
              style={{ marginLeft: "12%", color: "black" }}
            >
              <Badge badgeContent={storeWishList?.length} color="error">
                <i
                  style={{ position: "relative", left: "10px" }}
                  onClick={() => navigate("/wishList")}
                  className="bi bi-suit-heart"
                ></i>
              </Badge>
              <Badge badgeContent={storeCart?.length} color="error">
                <i
                  style={{ position: "relative", left: "10px" }}
                  onClick={() => navigate("/cart")}
                  className="bi bi-basket3"
                ></i>
              </Badge>
            </div>
            <div className="nav-item d-flex m-auto login dropdown bold  w-25">
              {!User ? (
                <>
                  <a className="nav-item nav-link m-1 bold  d-flex ">
                    <i
                      className="fa-solid fa-user fa-2x"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    ></i>
                  </a>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/login");
                        handleClose();
                      }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/signup");
                        handleClose();
                      }}
                    >
                      Register
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <a className="nav-item nav-link m-1 bold  d-flex ">
                    <Avatar
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      sx={{ bgcolor: "#dc3545" }}
                    >
                      {User?.name[0]}
                    </Avatar>
                  </a>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/create");
                        handleClose();
                      }}
                    >
                      Create Bike
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/mylist");
                        handleClose();
                      }}
                    >
                      My Bikes
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/my-orders");
                        handleClose();
                      }}
                    >
                      My Orders
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(logoutUser())}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
