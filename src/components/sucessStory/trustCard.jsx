import React from "react";
import Carousel from 'react-elastic-carousel';

export default function Card() {
    const array = [1, 2, 3, 4, 5, 6];
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 2 },
        { width: 1200, itemsToShow: 4 },
    ]
    return <>
        <Carousel breakPoints={breakPoints} pagination={false}>
            {
                array.map((item, index) => {
                    return <div key={index} className="mx-1">
                        <div className="card-body card-width">
                            <section className="d-flex justify-content-between card-text-trust text-muted">
                                <div>
                                    <i className="fa fa-star text-success"></i>
                                    <i className="fa fa-star text-success"></i>
                                    <i className="fa fa-star text-success"></i>
                                    <i className="fa fa-star text-success"></i>
                                    <i className="fa fa-star text-success"></i>
                                </div>
                                <span>1 hour ago</span>
                            </section>
                            <h5 className="card-title heading-trust mt-2 p-2 fw-bold">Leaving house and home to strangers</h5>
                            <p className="card-text card-text-trust">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text card-text-trust"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                })
            }
        </Carousel>
    </>
}