import { DeleteForeverOutlined } from "@material-ui/icons";
import commaNumber from "comma-number";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../../common/api";
import {
    removeWishListProducts, setCartProducts
} from "../../redux/reducers/productSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const storeCart = useSelector((state) => state.products.wishList);
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
                            src="https://aquamarineexotic.com/adminpanel/assets/images/empty-wishlist.png"
                            alt=""
                        />
                    </div>
                ) : (
                    <>
                        <h4 className="text-center py-3 bg-white">My WishList</h4>
                        <section
                            className="flex justify-between mt-3 cart-container"
                            style={{ justifyContent: "space-around", alignItems: "start" }}
                        >
                            <div>
                                {storeCart?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div
                                                className="flex-1 col-lg-8 bg-white px-4 py-3"
                                                style={{ height: "fit-content" }}
                                            >
                                                <section className="d-flex cart-main mb-4 justify-content-between">
                                                    <div className="d-flex cart-items-parent justify-content-around align-items-center">
                                                        <div className="d-flex align-items-center name-section">
                                                            <LazyLoadImage
                                                                effect="blur"
                                                                src={`${serverURL}${item?.productPic}`}
                                                                width="80px"
                                                                height="80px"
                                                            />
                                                            <div>
                                                                <span className="name-margin">
                                                                    {item?.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="price-section">
                                                        <span className="text-yellow-600">
                                                            Rs {commaNumber(item?.price)}
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                dispatch(setCartProducts({ product: item, count: 1 }));
                                                                dispatch(removeWishListProducts(item));
                                                                toast.success("Add To Cart");
                                                            }}
                                                        >
                                                            <i title="Add To Cart"
                                                                className="bi bi-basket3"
                                                                style={{
                                                                    color: '#d32229',
                                                                    fontSize: 'large',
                                                                    fontWeight: 'bold'
                                                                }}
                                                            ></i>
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                dispatch(removeWishListProducts(item));
                                                                toast.success("Remove from WishList");
                                                            }}
                                                        >
                                                            <DeleteForeverOutlined titleAccess="Delete From WishList" />
                                                        </span>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default Cart;
