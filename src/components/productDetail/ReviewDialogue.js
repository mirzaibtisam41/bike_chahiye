import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Modal, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { postReviewApi, postReviewSparePartApi } from '../../common/api';

function MydModalWithGrid(props) {
    const { user } = useSelector(state => state.user);
    const [detail, setDetail] = useState(null);
    const [star, setStar] = useState(null);
    const [loading, setLoading] = useState(false);

    const changeRating = (newRating) => {
        setStar(newRating);
    }

    const submitReview = async () => {
        if (detail === null || star === null) return toast.error("Fields must not be empty!");
        else {
            setLoading(true);
            let obj = {
                pId: props.product._id,
                uId: user?._id,
                review: detail,
                rating: star
            }
            if (props?.flag) {
                const { data } = await axios.post(postReviewApi, obj);
                if (data) {
                    setLoading(false);
                    toast.success('Review Added Successfully');
                    props?.setModalShowFunc(false);
                }
            }
            else {
                const { data } = await axios.post(postReviewSparePartApi, obj);
                if (data) {
                    setLoading(false);
                    toast.success('Review Added Successfully');
                    props?.setModalShowFunc(false);
                }
            }
        }
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Toaster position="top-right" reverseOrder={false} />
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rating For {props.product && props.product.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <label htmlFor="exampleInputEmail1">Rating</label><br />
                            <ReactStars
                                count={5}
                                onChange={changeRating}
                                size={30}
                                activeColor="#dc3545"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Detail</label>
                                <textarea onChange={(e) => setDetail(e.target.value)} className="form-control" rows="3" placeholder="Detail About Your Comment" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger"
                    onClick={submitReview}
                >
                    {
                        loading ? <CircularProgress style={{ color: "white" }} /> : 'Submit'
                    }
                </button>
            </Modal.Footer>
        </Modal >
    );
}

const ReviewModal = ({ product, modalShow, setModalShowFunc, setProduct, flag }) => {

    return (
        <MydModalWithGrid flag={flag} setProduct={setProduct} setModalShowFunc={setModalShowFunc} product={product} show={modalShow} onHide={() => setModalShowFunc(false)} />
    );
}

export default ReviewModal;