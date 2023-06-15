

import React from 'react';
import FHeader from './FirstHeader/FHeader';
// import SHeader from './SHeader/SHeader';
import Navbars from './Navbars/Navbars';
import AfterNav from './AfterHeader/AfterHeader';

const index = () => {
    return (
        <div>
            <FHeader />
            {/* <SHeader /> */}
            <Navbars />
            <AfterNav />
        </div>
    )
}

export default index;