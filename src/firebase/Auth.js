import React, {useState, useEffect} from 'react';
import app from './base.js';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value = {{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};