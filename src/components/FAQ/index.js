import React from 'react';
import Hero from "./FaqComp/Hero";
import Tabs from './FaqComp/Tabs';
import Detail from './FaqComp/Detail';

import ContactCusSupp from './FaqComp/ContactCusSupp';
import SearchFAQ from './FaqComp/SearchFAQ';

const index = () => {
    return (
        <div>
            <Hero />
            <Tabs />
            <Detail />
            <SearchFAQ/>
            {/* <ContactCusSupp /> */}
            {/* <Reviews /> */}
        </div>
    )
}

export default index;