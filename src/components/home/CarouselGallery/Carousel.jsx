import React from "react";
import { Row, Col } from "react-bootstrap";
import img from "../../images/carousel-1.jpg";
import img1 from "../../images/carousel-2.jpg";
import img2 from "../../images/carousel-3.jpg";
import Gallery from "./Gallery";
import "./Carousel.css";

const Carousel = () => {
  return (
    <>
      <div className="container my-4">
        <Row>
          <Col lg={5} className="col-5-carousel ">
            <div
              id="carouselExampleIndicators"
              className="carousel slide d-block "
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={img}
                    style={{ height: "23rem" }}
                    className="d-block w-100"
                    alt="..."
                  />
                  
                </div>
              </div>
            </div>
          </Col>
          <Col className="p-0 nd2-col-gallery" lg={7}>
            <Gallery />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Carousel;
