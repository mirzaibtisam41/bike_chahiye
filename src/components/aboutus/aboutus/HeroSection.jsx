import React from "react";
import { Row, Col } from "react-bootstrap";
import "./style.css";

const HeroSection = ({ heading, success }) => {
  return (
    <>
      <div className="support-main">
        <Row className="container mx-auto row-faq row-resource mr-45">
          <Col
            lg={5}
            md={7}
            className="d-flex flex-column justify-content-center "
          >
            <h3 className="text-white text-uppercase h1">About Us</h3>
            <div className="justify">
              <span className="text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequuntur, possimus doloremque. Expedita ab doloremque
                ratione esse nesciunt in, numquam officia accusamus veritatis
                labore maxime tempora ullam?
              </span>
            </div>
            <br />
          </Col>
          <Col
            lg={5}
            md={7}
            className="row-faq d-flex justify-content-center align-items-center"
          >
            <img
              className="w-100 faq-img req-image"
              src="https://img.icons8.com/bubbles/2x/tall-person.png"
              alt=""
            />
          </Col>
        </Row>
      </div>
      <section className="text-center bygga-parent py-4">
        {heading !== false && (
          <section className="container text-center mt-4">
            <span
              className=" h2 bold"
              style={{ borderBottom: "3px solid #dc3545", color: "black" }}
            >
              {success ? success : "ABOUT US"}
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
      </section>
    </>
  );
};

export default HeroSection;
