import React from 'react';
import { Row, Col } from "react-bootstrap";
import { serverURL } from '../../../common/api';
import icon from "../../FAQ/FaqComp/img/icon.png";

const VendorHero = ({ vendor }) => {
    return (
        <div className="mt-5 mb-5">
            <section className="shadow-sm mb-5">
                <Row className="container mx-auto py-4">
                    <Col className=" d-flex justify-content-center align-items-center">
                        <img className="faq-hero-img" src={`${serverURL}${vendor?.image}`} alt="" />
                    </Col>
                    <Col lg={5} style={{ letterSpacing: "1px" }} className="col-2-faq d-flex flex-column justify-content-center">
                        <p className="text-white faq-need-help hero-sec-text text-uppercase fw-bold fs-2 span-letter-spc text-muted">Need Help?</p>
                        <span className="text-muted">Feel Free to browse through our
                            <span className="text-danger fw-bold"> FAQs </span>or<br />
                            <span className="text-danger text-capitalize fw-bold"> contact customer support. </span>
                            <p className="text-muted">we are here to listen 24/7.</p>
                        </span>
                    </Col>
                    <Col className="col-3-faq d-flex align-items-end">
                        <section className="d-flex justify-content-start align-items-center ">
                            {/* <img style={{ width: "10%" }} src="https://firewallforce.net/wp-content/uploads/2020/06/fw-icon-300x300.png" alt="" /> */}
                            <span className="text-danger mt-2 h3 mx-2 bold fw-light">PK<span className="text-muted h3 bold fw-light">Bikes</span></span>
                        </section>
                    </Col>
                </Row>
            </section>
            {/* <section className="text-center bygga-parent py-5">
                <span className="back-border bygga-text-heading fs-4 fw-bold text-muted text-capitalize">How can we help you ?
                </span>
            </section> */}
        </div>
    )
}

export default VendorHero;