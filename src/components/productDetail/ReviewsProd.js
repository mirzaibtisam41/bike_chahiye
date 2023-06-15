import moment from "moment";
import React, { useState } from 'react';
import ReviewDialogue from "./ReviewDialogue";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Avatar from '@mui/material/Avatar';

const Reviews = ({ product, setProduct }) => {
    const { user } = useSelector(state => state.user);
    const [showReview, setReview] = useState(10);
    const [modalShow, setModalShowFunc] = useState(false);

    const openRatingModal = () => {
        if (user) {
            setModalShowFunc(true);
        }
        else {
            toast.error("Please Login To Post Review");
        }
    }

    return (
        <section className="bg-white mt-2 mx-4 py-4 body-font">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="width-review">
                <div style={{
                    textAlign: "right"
                }}>
                    <button onClick={openRatingModal} className="btn text-white h-12 mr-3" style={{ backgroundColor: "#dc3545" }}>
                        <i className="fa fa-star text-white mx-2"></i>
                        Rate Product
                    </button>
                </div>
                {
                    (product && product?.pRatingsReviews?.length > 0) ? product?.pRatingsReviews?.filter(item => item?.approved === true)?.map((item, index) => {
                        if (index <= showReview) {
                            return <div key={index} className="py-2 divide-gray-100" style={{ borderBottom: index < product?.pRatingsReviews?.length - 1 && "1px solid #dee2e6" }}>
                                <div className="pb-1 flex flex-wrap md:flex-nowrap flex-col">
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <Avatar>M</Avatar>
                                            <span style={{ marginLeft: '10px', fontSize: 'large' }}>{item?.user?.name}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '10px'
                                        }}>
                                            <span className="inline-flex items-center justify-center text-xs leading-none bg-green-700 rounded">
                                                <ReactStars
                                                    count={5}
                                                    size={18}
                                                    activeColor="#dc3545"
                                                    value={item?.rating}
                                                    edit={false}
                                                />
                                            </span>
                                            <span style={{ fontSize: 'smaller' }} className="font-semibold title-font text-gray-700 mx-2"> {moment(item.createdAt).format('l')}</span>
                                        </div>
                                    </div>
                                    <div className="md:flex-grow"
                                        style={{
                                            display: 'flex'
                                        }}
                                    >
                                        <span className="text-gray-500 text-sm mr-3 mt-1">
                                            {item?.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    }) : <h2 className="mt-3">No Reviews</h2>
                }
            </div>
            <ReviewDialogue
                product={product && product}
                modalShow={modalShow}
                setModalShowFunc={setModalShowFunc}
                setProduct={setProduct}
                flag={true}
            />
        </section>
    )
}

export default Reviews;