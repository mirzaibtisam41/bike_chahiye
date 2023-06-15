import React from 'react'
import Carousel_2 from '../../images/carousel-2.jpg'
import Carousel_3 from '../../images/carousel-3.jpg'
import Carousel_4 from '../../images/carousel-4.jpg'
const FeaturedVendor = () => {
  return (  <div className='section-4  p-4 bg-lightGray'>
          <div className='row mt-2 mb-2 d-flex justify-content-center'>
            <div className='col-10'>
              <div className='row '>
                <h2 className='col bold d-flex justify-content-start'>Featured Vendor</h2>
                {/* <button className='col-1 bold text-center view-all' style={{width: "100px"}}>View All</button> */}
              </div>
            </div>
          </div>

          <div className='row  p-2 d-flex justify-content-center'>
            <div className='col-11 col-md-11'>
              <div className='row justify'>
                <div className="col-12 col-md m-2 p-4 bd-highlight bg-white b-radius">
                  <div className=" mb-auto  bd-highlight">
                    <img className='img-fluid mb-4 b-radius' src={Carousel_4} alt="Picture" />
                  </div>
                  <div className="bd-highlight">
                    <h5 >Product Title</h5>
                  </div>
                  <div className="bd-highlight">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div className="row bd-highlight">
                    <i className="col-2 bi bi-geo-alt"></i>
                    <p className='col' >Gulberg, Lahore</p>
                  </div>
                  <div className="bd-highlight">
                    <button className='p-1 bold buy-now'>Buy Now</button>
                  </div>
                </div>

                <div className="col-12 col-md m-2 p-4 bd-highlight bg-white b-radius">
                  <div className=" mb-auto  bd-highlight">
                    <img className='img-fluid mb-4 b-radius' src={Carousel_2} alt="Picture" />
                  </div>
                  <div className="bd-highlight">
                    <h5 >Product Title</h5>
                  </div>
                  <div className="bd-highlight">
                    <p>Lorem,11 ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div className="row bd-highlight">
                    <i className="col-2 bi bi-geo-alt"></i>
                    <p className='col' >Gulberg, Lahore</p>
                  </div>
                  <div className="bd-highlight">
                    <button className='p-1 bold buy-now'>Buy Now</button>
                  </div>
                </div>
              
                <div className="col-12 col-md m-2 p-4 bd-highlight bg-white b-radius">
                  <div className=" mb-auto bd-highlight">
                    <img className='img-fluid mb-4 b-radius' src={Carousel_3} alt="Picture" />
                  </div>
                  <div className="bd-highlight">
                    <h5 >Product Title</h5>
                  </div>
                  <div className="bd-highlight">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div className="row bd-highlight">
                    <i className="col-2 bi bi-geo-alt"></i>
                    <p className='col' >Gulberg, Lahore</p>
                  </div>
                  <div className="bd-highlight">
                    <button className='p-1 bold buy-now'>Buy Now</button>
                  </div>
                </div>

                <div className="col-12 col-md m-2 p-4 bd-highlight bg-white b-radius">
                  <div className=" mb-auto bd-highlight">
                    <img className='img-fluid mb-4 b-radius' src={Carousel_3} alt="Picture" />
                  </div>
                  <div className="bd-highlight">
                    <h5 >Product Title</h5>
                  </div>
                  <div className="bd-highlight">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div className="row bd-highlight">
                    <i className="col-2 bi bi-geo-alt"></i>
                    <p className='col' >Gulberg, Lahore</p>
                  </div>
                  <div className="bd-highlight">
                    <button className='p-1 bold buy-now'>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
  )
}

export default FeaturedVendor
