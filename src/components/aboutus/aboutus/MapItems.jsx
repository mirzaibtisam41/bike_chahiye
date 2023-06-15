import React from "react";
import { Row, Col } from "react-bootstrap";
import "./style.css";

const MapItems = ({ index }) => {
  return (
    <div
      className={
        (index + 1) % 2 === 0
          ? "d-flex justify-content-end div-resource-item"
          : "d-flex justify-content-start div-resource-item"
      }
    >
      <Row
        className={
          (index + 1) % 2 === 1
            ? "row-overlay row-items mt-5 py-4"
            : "row-overlay flex-row-reverse row-items mt-5 py-3"
        }
      >
        <Col>
          <section className="bg-white text-section px-4 py-5">
            <span
              className="text-muted fw-light"
              style={{ fontSize: "smaller" }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
              cum perspiciatis et delectus exercitationem earum provident fugit
              deserunt eaque! Nostrum optio vitae ducimus similique minima iusto
              amet inventore rerum exercitationem? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Ducimus cum perspiciatis et delectus
              exercitationem earum provident fugit deserunt eaque! Nostrum optio
              vitae ducimus similique minima iusto amet inventore rerum
              exercitationem?
            </span>
            <br />
          </section>
        </Col>
        <Col className="column-pictire-overlay col-overlay-resource">
          <div className="detail-item d-flex justify-content-center align-items-center">
            <div className="overlay d-flex align-items-center">
              <div className="mx-3 text-center">
                <h3 className="text-uppercase">Lorem Ipsem</h3>
                <span className="font-size-small">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  dolor nostrum eum quas quis possimus quod tenetur, blanditiis
                  ea incidunt veritatis qui est tempora pariatur autem quaerat
                  quae quidem fugiat!
                </span>
                {/* <div className="py-4 text-center">
                                    <button className="btn btn-danger text-capitalize">Learn More</button>
                                </div> */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MapItems;
