import React,{useState} from 'react'
import { Carousel } from 'react-bootstrap'
import '../../css/component.css'
 const Carousals = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect} className=''>
          <Carousel.Item>
            <div className='carousel-1 row d-flex justify-content-center align-items-center'>
              <div className='col-10 col-md-7 mb-4'>
               <h1 className='bold section-1-h1' style={{color: "red"}}>Your Bike One Stop</h1>
               <h6 className='bold' style={{color: "white", fontSize: "20px"}}>Great news for our customers across Pakistan.</h6>
               <button className='mt-4 p-2 bold section-1-btn'>Shop Now</button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item >
            <div className='carousel-2 row d-flex justify-content-center align-items-center'>
              <div className='col-10 col-md-7 mb-4'>
               <h1 className='bold section-1-h1' style={{color: "red"}}>Your Bike One Stop</h1>
               <h6 className='bold' style={{color: "white", fontSize: "20px"}}>Great news for our customers across Pakistan.</h6>
               <button className='mt-4 p-2 bold section-1-btn'>Shop Now</button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='carousel-3 row d-flex justify-content-center align-items-center'>
              <div className='col-10 col-md-7 mb-4'>
               <h1 className='bold section-1-h1' style={{color: "red"}}>Your Bike One Stop</h1>
               <h6 className='bold' style={{color: "white", fontSize: "20px"}}>Great news for our customers across Pakistan.</h6>
               <button className='mt-4 p-2 bold section-1-btn'>Shop Now</button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
        </div>
    )
}


export default Carousals