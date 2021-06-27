import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRouter = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRouter;