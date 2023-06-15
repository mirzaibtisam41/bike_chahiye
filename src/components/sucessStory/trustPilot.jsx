import React from 'react';
import "./style.css";
import { Row, Col } from "react-bootstrap";
import Card from "./trustCard";

const Trustpilot = () => {
    return (
        <div className="mb-5">
            <section className="container">
                <div>
                    <section className="d-flex justify-content-center align-items-center">
                        <i className="fa fa-star text-success fa-lg"></i>
                        <h2 className="pt-2">Trustpilot</h2>
                         {/* <a href="https://se.trustpilot.com/review/firewallforce.se" className="h3 aTag fw-bold">Trustpilot</a> */}
                    </section>
                    <section className="d-flex justify-content-center align-items-center">
                        <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                        <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                        <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                        <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                        <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                    </section>
                </div>
            </section>
            <section className="container trust-border py-5 px-3 mt-4">
                <Row>
                    <Col lg={3} className="excellent-margin">
                        <section className="text-center mt-3">
                            <h3>Excellent</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                                <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                                <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                                <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                                <i className="fa fa-star star mx-1 text-white bg-success fa-lg"></i>
                            </div>
                            <div className="mt-2 text-muted" style={{ fontSize: "smaller", fontWeight: "400" }}>
                                <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. deserunt suscipit</span>
                            </div>
                        </section>
                    </Col>
                    <Col lg={9}>
                        <Card />
                    </Col>
                </Row>
            </section>
        </div>
    )
}

export default Trustpilot;