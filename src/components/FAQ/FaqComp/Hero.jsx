import React from 'react';
import { Row, Col } from "react-bootstrap";
import icon from "./img/icon.png";

const Hero = ({heading, success}) => {
    return (
      <div className="mt-5 mb-5">
        <section className="shadow-sm">
          <Row className="container mx-auto py-4">
            <Col className=" d-flex justify-content-center align-items-center">
              <img className="faq-hero-img" src={icon} alt="" />
            </Col>
            <Col
              lg={5}
              style={{ letterSpacing: "1px" }}
              className="col-2-faq d-flex flex-column justify-content-center"
            >
              <p className="text-white faq-need-help hero-sec-text text-uppercase fw-bold fs-2 span-letter-spc text-muted">
                Need Help?
              </p>
              <span className="text-muted">
                Feel Free to browse through our
                <span className="text-danger fw-bold"> FAQs </span>or
                <br />
                <span className="text-danger text-capitalize fw-bold">
                  {" "}
                  contact customer support.{" "}
                </span>
                <p className="text-muted">we are here to listen 24/7.</p>
              </span>
            </Col>
            <Col className="col-3-faq d-flex align-items-end">
              <section className="d-flex justify-content-start align-items-center ">
                {/* <img style={{ width: "10%" }} src="https://firewallforce.net/wp-content/uploads/2020/06/fw-icon-300x300.png" alt="" /> */}
                <span className="text-danger mt-2 h3 mx-2 bold fw-light">
                  PK<span className="text-muted h3 bold fw-light">Bikes</span>
                </span>
              </section>
            </Col>
          </Row>
        </section>
        <section className="text-center bygga-parent py-5">
          {heading !== false && (
            <section className="container text-center mt-4">
              <span
                className=" h2 bold"
                style={{ borderBottom: "3px solid #dc3545", color: "black" }}
              >
                {success ? success : "HOW CAN WE HELP YOU ?"}
              </span>
              <div className={success ? "my-4" : "mx-auto my-2 service-text"}>
                {!success && (
                  <span className="text-center mt-2 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate exercitationem sequi
                  </span>
                )}
              </div>
            </section>
          )}
          {/* <span className="back-border bygga-text-heading fs-4 fw-bold text-muted text-capitalize">How can we help you ?
                </span> */}
        </section>
      </div>
    );
}

export default Hero;