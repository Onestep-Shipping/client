import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, ...rest }) => {
  const {currentUser} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() =>
        currentUser ? (
          children
        ) : (
          <Redirect to = {'/'} />
        )
      }
    />
  );
};

export default PrivateRoute;
