import commaNumber from "comma-number"
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LazyLoadImage } from "react-lazy-load-image-component"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from 'react-redux'
import { serverURL } from '../../common/api'
import { calculateRatings, calculateRatingsForSparePart } from '../../common/func'
import { removeCartProducts, removeWishListProducts, setCartProducts, setRating, setWishListProducts } from '../../redux/reducers/productSlice'
import TopSeller from '../home/TopSeller/TopSeller'
import SuccessStory from "../sucessStory/index"
import CompareModel from './CompareModel'
import MostRelatedProduct from './RelatedProduct'
import Review from './Reviews'
import ReviewProduct from './ReviewsProd'
import Tabs from './Tabs'
import "./productDetail.css"

const ProductDetail = () => {
    console.log(window.location.search)
    const dispatch = useDispatch();
    const storeProducts = useSelector((state) => state.products.products);
    const storeCart = useSelector((state) => state.products.cart);
    const storeWishList = useSelector((state) => state.products.wishList);
    const storeSpareParts = useSelector((state) => state.products.spareParts);
    const rating = useSelector((state) => state.products.rating);

    const [id, setID] = useState(window.location.pathname.split('/')[2]);
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [activePic, setActivePic] = useState(0);
    const [activeCompare, setActiveCompare] = useState(false);
    const [brands, setBrands] = React.useState([]);
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const _map = storeProducts?.map(item => item?.brand);
        const uniq = [...new Set(_map)];
        setBrands(uniq);
    }, [storeProducts]);

    useEffect(() => {
        if (window.location.search) {
            storeSpareParts.forEach(item => {
                if (item._id === id) {
                    const ratings = calculateRatingsForSparePart(item);
                    dispatch(setRating(ratings));
                    setProduct(item);
                }
            });
        }
        else {
            storeProducts.forEach(item => {
                if (item._id === id) {
                    const ratings = calculateRatings(item);
                    dispatch(setRating(ratings));
                    setProduct(item);
                }
            });
        }
    }, [id]);

    return (<>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <CompareModel
            activeCompare={activeCompare}
            setActiveCompare={setActiveCompare}
        />
        <section className="product_detail col-10 ">
            <div className="container">
                <div>
                    <h3 className="section-heading text-uppercase bold">{product?.name}</h3>
                </div>
                <div className="res_img">
                    <div className="Product_rating d-flex justify-content-center">
                        <ReactStars
                            count={5}
                            size={30}
                            activeColor="#dc3545"
                            value={rating !== null ? rating : 2}
                            edit={false}
                        />
                    </div>
                    {
                        window.location.search ?
                            <div className="product_img2">
                                <div className="img-pic-mbl">
                                    <LazyLoadImage effect="blur" className="img-pic-mbl rounded" src={`${serverURL}${product?.partPic[activePic]}`} alt="image" />
                                </div>
                                <section className="mt-3 d-flex justify-content-center">
                                    {
                                        product?.partPic?.map((item, index) => {
                                            return <div className="p-1 mx-2 rounded"
                                                style={{
                                                    border: activePic === index ? '1px solid red' : null
                                                }}
                                            >
                                                <LazyLoadImage effect="blur"
                                                    key={index}
                                                    onClick={() => setActivePic(index)}
                                                    className="img-fluid rounded border"
                                                    src={`${serverURL}${item}`}
                                                    alt="image"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'fill'
                                                    }}
                                                />
                                            </div>
                                        })
                                    }
                                </section>
                            </div>
                            :
                            <div className="product_img2">
                                <div className="img-pic-mbl">
                                    <LazyLoadImage effect="blur" className="img-pic-mbl rounded" src={`${serverURL}${product?.productPic[activePic]}`} alt="image" />
                                </div>
                                <section className="mt-3 d-flex justify-content-center">
                                    {
                                        product?.productPic?.map((item, index) => {
                                            return <div className="p-1 mx-2 rounded"
                                                style={{
                                                    border: activePic === index ? '1px solid red' : null
                                                }}
                                            >
                                                <LazyLoadImage effect="blur"
                                                    key={index}
                                                    onClick={() => setActivePic(index)}
                                                    className="img-fluid rounded border"
                                                    src={`${serverURL}${item}`}
                                                    alt="image"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'fill'
                                                    }}
                                                />
                                            </div>
                                        })
                                    }
                                </section>
                            </div>
                    }
                    <div className="product_description p-3" style={{ textAlign: 'justify' }}>
                        <p>{product?.detail}</p>
                    </div>
                    <div className="product_description2 border">
                        <div className="product_price">
                            <p>{commaNumber(product?.price)} PKR</p>
                        </div>
                        <div className="product_cart">
                            <a
                                onClick={() => {
                                    if (storeCart?.some(item => item?.product?._id === id)) {
                                        dispatch(removeCartProducts(product));
                                        toast.success('Remove from cart');
                                    }
                                    else {
                                        dispatch(setCartProducts({ product, count }));
                                        toast.success('Add to cart');
                                    }
                                }}
                                className="btn text-uppercase btn-cart"
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white'
                                }}
                                role="button">
                                {
                                    storeCart?.some(item => item?.product?._id === id) ? "Remove from cart" : "Add to cart"
                                }
                            </a>
                        </div>
                        <div className="product_qty ">
                            <button type="button" className="button_count">Pcs
                                <input onChange={(e) => setCount(e.target.value)} className="qty m-1" type="number" defaultValue={1} min={1} />
                            </button>
                        </div>
                    </div>
                    <div className="product_wish">
                        <div className="wishlist">
                            <section style={{ width: '200px' }} className="d-flex justify-content-center align-items-center" onClick={() => {
                                if (storeWishList?.some(item => item?._id === id)) {
                                    dispatch(removeWishListProducts(product));
                                    toast.success('Remove from wishlist');
                                }
                                else {
                                    dispatch(setWishListProducts(product));
                                    toast.success('Add to wishlist');
                                }
                            }}>
                                <i className="fa-regular fa-heart"
                                    style={{
                                        color: storeWishList?.some(item => item?._id === id) ? 'red' : null
                                    }}
                                ></i>
                                <span style={{ fontSize: 'initial', marginLeft: '10px' }}>
                                    {
                                        storeWishList?.some(item => item?._id === id) ? "Remove from wishlist" : "Add to wishlist"
                                    }
                                </span>
                            </section>
                        </div>
                        {
                            !window.location.search &&
                            <div className="compare" onClick={() => setActiveCompare(true)}>
                                <i className="fa-solid fa-timeline"></i>
                                <h6 className="wishtext"> Compare </h6>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="product_img container" >
                <section className="img-parent">
                    {
                        window.location.search ?
                            <LazyLoadImage effect="blur" className="img-pic rounded" src={`${serverURL}${product?.partPic[activePic]}`} alt="images" />
                            :
                            <LazyLoadImage effect="blur" className="img-pic rounded" src={`${serverURL}${product?.productPic[activePic]}`} alt="images" />
                    }
                </section>
                <section className="mt-3 d-flex justify-content-evenly">
                    {
                        window.location.search ?
                            product?.partPic?.map((item, index) => {
                                return <div className="p-1 mx-2 rounded"
                                    style={{
                                        border: activePic === index ? '1px solid red' : null
                                    }}
                                >
                                    <LazyLoadImage effect="blur"
                                        key={index}
                                        onClick={() => setActivePic(index)}
                                        className="img-fluid rounded border"
                                        src={`${serverURL}${item}`}
                                        alt="image"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'fill'
                                        }}
                                    />
                                </div>
                            })
                            :
                            product?.productPic?.map((item, index) => {
                                return <div className="p-1 mx-2 rounded"
                                    style={{
                                        border: activePic === index ? '1px solid red' : null
                                    }}
                                >
                                    <LazyLoadImage effect="blur"
                                        key={index}
                                        onClick={() => setActivePic(index)}
                                        className="img-fluid rounded border"
                                        src={`${serverURL}${item}`}
                                        alt="image"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'fill'
                                        }}
                                    />
                                </div>
                            })
                    }
                </section>
            </div>
        </section>
        <div className="border mb-4 text-details" style={{ width: '75%', margin: 'auto' }}>
            <Tabs
                value={value}
                setValue={setValue}
            />
            <section>
                {
                    value === 0 &&
                    <div className="product_table p-3">
                        <div className="table-responsive">
                            <table className="table">
                                <tr>
                                    {
                                        window.location.search ? <>
                                            <td className="main__text-4-td bold">Brand:{`${" "}`}</td>
                                            <td className="main__text-5-td ">{product?.brand}</td>
                                        </>
                                            : <>
                                                <td className="main__text-4-td bold">SKU:</td>
                                                <td className="main__text-5-td ">00776645</td>
                                            </>
                                    }
                                </tr>
                                <tr>
                                    <td className="main__text-4-td bold">Categories:</td>
                                    {
                                        window.location.search ?
                                            <td className="main__text-5-td ">{product && product.category}</td>
                                            :
                                            <td className="main__text-5-td ">{product && product.category[0]}</td>
                                    }
                                </tr>
                                <tr>
                                    {
                                        window.location.search ?
                                            <>
                                                <td className="main__text-4-td bold">Available: </td>
                                                <td className="main__text-5-td ">{product?.active ? 'Yes' : 'No'}</td>
                                            </>
                                            :
                                            <>
                                                <td className="main__text-4-td bold">Location: </td>
                                                <td className="main__text-5-td ">Lahore,punjab,</td>
                                            </>
                                    }
                                </tr>
                            </table>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <tr>
                                    {
                                        window.location.search ? <>
                                            <td className="main__text-4-td bold">Discount:</td>
                                            <td className="main__text-5-td ">{product?.discount} PKR</td>
                                        </>
                                            : <>
                                                <td className="main__text-4-td bold">Vendor:</td>
                                                <td className="main__text-5-td ">Auto Store</td>
                                            </>
                                    }
                                </tr>
                                <tr>
                                    <td className="main__text-4-td bold">Delivery:</td>
                                    <td className="main__text-5-td ">In 7 days</td>
                                </tr>
                                <tr>
                                    {
                                        window.location.search ?
                                            <>
                                                <td className="main__text-5-td bold">Type:</td>
                                                <td className="main__text-5-td ">{product?.types}</td>
                                            </>
                                            :
                                            <>
                                                <td className="main__text-5-td bold">Status:</td>
                                                <label style={{ color: "seaGreen", }} for="rating1" className="main__text-5-td fa fa-cube fa-2x"></label>
                                            </>
                                    }
                                </tr>
                            </table>
                        </div>
                    </div>
                }
                {
                    value === 2 &&
                    <div className="product_description p-3" style={{ textAlign: 'justify' }}>
                        <p>{product?.detail}</p>
                    </div>
                }
                {
                    value === 1 ?
                        window.location?.search
                            ?
                            <Review setProduct={setProduct} product={product} />
                            :
                            <ReviewProduct setProduct={setProduct} product={product} />
                        : null
                }
            </section>
        </div>
        <MostRelatedProduct
            product={product}
            serverURL={serverURL}
            setID={setID}
        />
        <SuccessStory />
        <TopSeller />
    </>)
}
export default ProductDetail