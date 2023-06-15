import { DeleteForeverOutlined } from "@material-ui/icons";
import commaNumber from "comma-number";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../../common/api";
import {
  removeCartProducts,
  updateCartProduct,
} from "../../redux/reducers/productSlice";
import Payment from "./Payment";
import "./style.css";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeCart = useSelector((state) => state.products.cart);
  return (
    <React.Fragment>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className={"py-2 px-5 m-2 bg-white cart-padding"}
        style={{ minHeight: "75vh" }}
      >
        {storeCart.length === 0 ? (
          <div className="d-flex justify-content-center mt-24">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AZ826hsut4_Te3sWXtIm7EfzDi-3xKLpyA&usqp=CAU"
              alt=""
            />
          </div>
        ) : (
          <>
            <h4 className="text-center py-3 bg-white">My Cart</h4>
            <section
              className="d-flex mt-3 cart-container"
              style={{ justifyContent: "center" }}
            >
              <div>
                {storeCart?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="flex-1 bg-white px-4 py-3"
                        style={{ height: "fit-content" }}
                      >
                        <section className="d-flex cart-main mb-4 justify-content-between">
                          <div className="d-flex cart-items-parent justify-content-around align-items-center">
                            <div className="d-flex align-items-center name-section">
                              <LazyLoadImage
                                effect="blur"
                                height="80px"
                                width="80px"
                                src={`${serverURL}${item?.product?.productPic
                                  ? item?.product?.productPic[0]
                                  : item?.product?.partPic[0]
                                  }`}
                              />
                              <div>
                                <span className="name-margin">
                                  {item?.product?.name}
                                </span>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                onClick={() => {
                                  dispatch(
                                    updateCartProduct({
                                      id: item?.product?._id,
                                      op: "-",
                                    })
                                  );
                                }}
                                className="minus-btn py-1 px-3 cursor-pointer"
                              >
                                -
                              </button>

                              <section className="px-4">{item?.count}</section>

                              <button
                                onClick={() => {
                                  dispatch(
                                    updateCartProduct({
                                      id: item?.product?._id,
                                      op: "+",
                                    })
                                  );
                                }}
                                className="minus-btn py-1 px-3 cursor-pointer"
                              >
                                {" "}
                                +{" "}
                              </button>
                            </div>
                          </div>

                          <div className="price-section">
                            <span className="text-yellow-600">
                              Rs {commaNumber(item?.product?.price)}
                            </span>
                            <span
                              onClick={() => {
                                dispatch(removeCartProducts(item?.product));
                                toast.success("Remove from cart");
                              }}
                            >
                              <DeleteForeverOutlined />
                            </span>
                          </div>
                          <div>
                            <button
                              style={{ marginTop: '20px' }}
                              onClick={() => {
                                navigate(`/checkout/${item?.product?._id}`)
                              }}
                              className="btn btn-danger"
                            >
                              Buy Now
                            </button>
                          </div>
                        </section>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {/* <Payment storeCart={storeCart} /> */}
              </div>
            </section>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Cart;
