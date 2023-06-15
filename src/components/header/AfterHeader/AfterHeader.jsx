
import React from 'react';
import "./Navbar.css";

const AfterNav = () => {
    return (
        <div className="main-after-nav">
            <section className="container afterNav-main d-flex justify-content-between align-items-center">
                <div className="afternav-div-container">
                    <span>Promise</span>
                </div>
                <div className="afternav-div-container">
                    <i className="fa fa-refresh mx-1" aria-hidden="true"></i>
                    <span>Free 30 Days </span>
                </div>
                <div className="afternav-div-container">
                    <span>Rated Excellent</span>
                </div>
                <div className="afternav-div-container">
                    <span>Fast Delivery 2-3 Days</span>
                </div>
                <div className="afternav-div-container">
                    <span>Pay With Invoice, 15-30 days </span>
                </div>
                <div className="afternav-div-container">
                    <span>Purchase Online, Buy</span>
                </div>
            </section>
        </div>
    )
}

export default AfterNav;