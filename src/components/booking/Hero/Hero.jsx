import React from "react";
import { Row, Col } from "react-bootstrap";
import icon from "../../FAQ/FaqComp/img/icon.png";

const Hero = ({heading, success}) => {
  return (
    <div className="mt-5 mb-5 ">
      <section className="shadow-sm">
        <Row className="container mx-auto py-5">
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
              <span className="text-danger mt-2 h3 mx-2 bold fw-light">
                PK<span className="text-muted h3 bold fw-light">Bikes</span>
              </span>
            </section>
          </Col>
        </Row>
      </section>
      <section className="text-center bygga-parent py-3">
        {heading !== false && (
          <section className="container text-center mt-4">
            <span
              className=" h2 bold"
              style={{ borderBottom: "3px solid #dc3545", color: "black" }}
            >
              {success ? success : "BOOK YOUR NEW BIKE"}
            </span>
          </section>
        )}
      </section>
    </div>
  );
};

export default Hero;
