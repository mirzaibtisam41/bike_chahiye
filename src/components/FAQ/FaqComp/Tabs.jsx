import React, { useState, useContext } from 'react';
import "./style.css";
import { GlobalContext } from "../../Context/Context";
import { Fa500Px } from "react-icons/fa";

const Tabs = () => {
    const [active, setActive] = useState(0);
    const { faqDisplayChangeFunc } = useContext(GlobalContext);
    const objectsData = [
        { view: "one", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon1.png", name: 'New Customer', subName: 'Guide' },
        { view: "two", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon2.png", name: 'Odering Guide', subName: '' },
        { view: "three", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon3.png", name: 'Shipping Guide', subName: '' },
        { view: "four", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon4.png", name: 'After Sale', subName: 'Support' },
        { view: "five", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon5.png", name: 'My Account', subName: '' },
        { view: "six", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon6.png", name: 'Warranty', subName: '& Claims' },
        { view: "seven", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon7.png", name: 'Returns', subName: '& Refunds' },
        { view: "eight", img: "https://firewallforce.se/wp-content/uploads/2020/08/faq-icon8.png", name: 'Payment Details', subName: '' },
    ]
    return (
        <section className="d-flex justify-content-center container diamond-overflow">
            {
                objectsData.map((item, index) => {
                    return <div onClick={() => {
                        setActive(index);
                        faqDisplayChangeFunc(item.view);
                    }} key={index} className={active === index ? "padding-bottom pb-4 d-flex flex-column align-items-center" : "padding-bottom pb-4 d-flex flex-column align-items-center"}>
                        <div className={active === index ? "square square-active" : "square"}>
                        <Fa500Px className='text-primary' size='2em' />
                            {/* <img src={item.img} alt="abc" style={{color:"white"}} /> */}
                        </div>
                        <div className="text-center text-div-1 mt-3 d-flex flex-column">
                            <span className={active === index ? "text-danger" : "text-muted"}>{item.name}</span>
                            <span className={active === index ? "text-danger" : "text-muted"}>{item.subName}</span>
                        </div>
                    </div>
                })
            }
        </section>
    )
}

export default Tabs;