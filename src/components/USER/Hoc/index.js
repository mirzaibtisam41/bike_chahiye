import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const index = (Component) => {
    function HOC() {
        const token = useSelector(state => state.user.token);
        return <React.Fragment>
            {token ? <Navigate to={'/profile'} /> : <Component />}
        </React.Fragment>
    }
    return HOC;
}

export default index;