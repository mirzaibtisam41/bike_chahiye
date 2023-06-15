import React from 'react';
import amex from '../images/amex.png'
import discover from '../images/discover.png'
import master_card from '../images/master-card.png'
import mastero from '../images/mastero.png'
import visa from '../images/visa.png'
const Footer = () => {
  return (
    <footer>
      <div className='row p-4 d-flex justify-content-center' style={{backgroundColor:'#32324E' }}>
        <div className='col-10 '>
          <div className='row d-flex justify-content-between align-items-center'>
            <div className='col-10 col-md-2 mt-3 mb-3 justify'>
              <h4 className='footer-heading mb-4'>Bikes<span style={{color: "white"}}>Here</span></h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, minus. Neque, autem architecto? Officiis sed tenetur repudiandae, quasi corporis ducimus animi</p>
            </div>
            <div className='col-12 col-md-9 mt-3 mb-3 justify  '>
              <div className='row '>
                <div className='col-12 col-sm col-md'>
                  <h5 className='footer-heading'>Get in touch</h5>
                  <p>About us</p>
                  <p>Careers</p>
                  <p>Press Release</p>
                  <p>Blog</p>
                </div>
                <div className='col-12 col-sm col-md'>
                  <h5 className='footer-heading'>Auto Parts</h5>
                  <p>Breaks</p>
                  <p>Tires</p>
                  <p>Filters</p>
                  <p>Motor Oil</p>
                  <p>Engine</p>
                </div>
                <div className='col-12 col-sm col-md'>
                  <h5 className='footer-heading'>Earnings</h5>
                  <p>Become an Affiliate</p>
                  <p>Advertise your product</p>
                  <p>Sell on Market</p>
                  <p>Vendors</p>
                </div>
                <div className='col-12 col-sm col-md'>
                  <h5 className='footer-heading'>Account</h5>
                  <p>Your account</p>
                  <p>Returns Centre</p>
                  <p>100% Purchase Protection</p>
                  <p>Chat with us</p>
                  <p>Help</p>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
      <div className='row p-2 d-flex justify-content-center'>
        <div className='col-10'>
          <div className='row'>
            <div className='col-12 col-sm d-flex align-items-center'>
              <p className='justify m-0' style={{fontWeight: '600',color: "gray"}}>Copyright © {(new Date()).getFullYear()} www.bikeshere.com</p>
            </div>
            <div className='col-12 col-sm footer-img  d-flex justify-content-end'>
              <img className='img-fluid' src={amex} alt="pic" />
              <img className='img-fluid' src={discover} alt="pic" />
              <img className='img-fluid' src={master_card} alt="pic" />    
              <img className='img-fluid' src={mastero} alt="pic" />    
              <img className='img-fluid' src={visa} alt="pic" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
