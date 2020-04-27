import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({component: RouteComponent, ...rest}) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render = {(routeProps) =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to = {'/auth'} />
        )
      }
    />
  );
};

export default PrivateRoute;
