import React from 'react';
import Accordion from './Accordion';

const SearchFAQ = () => {
    return (
        <div className="container">
            {/* <section className="d-flex justify-content-center">
                <div className="search faq-search d-flex align-items-center justify-content-around">
                    <input className="search-input" type="text" placeholder="Search FAQs..." aria-label="Search FAQs..." />
                    <i className="fa fa-search text-danger" aria-hidden="true"></i>
                </div>
            </section> */}
            <section>
                <Accordion />
            </section>
        </div>
    )
}

export default SearchFAQ;