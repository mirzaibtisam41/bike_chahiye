import React from 'react';
import { Row, Col } from "react-bootstrap";

const ContactCusSupp = () => {
    return (
        <div className="container support-main my-5 px-5 py-5">
            <Row className="row-faq">
                <Col lg={7} md={7} >
                    <h3 className="text-white text-capitalize h2">Can't find what you're looking for ?</h3>
                    <div className="justify">
                        <span style={{ top: "1rem", position: "relative" }} className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Consequuntur, possimus doloremque. Expedita ab doloremque ratione esse
                        nesciunt in, numquam officia accusamus veritatis labore maxime tempora ullam?
                        </span>
                    </div>
                    <br />
                    <button className="btn faq-btn bg-white text-muted mt-5">Contact Customer Support</button>
                </Col>
                <Col lg={5} md={5} className="row-faq d-flex justify-content-center align-items-center">
                    <img className="w-50 faq-img req-image" src="https://img.pngio.com/computer-networking-png-1-png-image-computer-networking-png-500_280.png" alt="" />
                </Col>
            </Row>
        </div>
    )
}

export default ContactCusSupp;