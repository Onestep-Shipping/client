import React, {useState, useEffect} from 'react';
import app from '../firebase/base.js';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(app.auth().currentUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsAdmin(user !== null && user.email === "rosephan99@gmail.com");
    });
  }, []);

  return (
    <AuthContext.Provider value = {{ currentUser, isAdmin }} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.element,
};