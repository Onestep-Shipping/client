import React, {useState} from 'react';
import './Auth.css';
import LoginForm from '../../components/AuthForm/LoginForm.js';
import RegisterForm from '../../components/AuthForm/RegisterForm.js';
import {useHistory} from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();

  const [inLoginform, setForm] = useState(true);

  const showLoginForm = () => {
    setForm(true);
  };

  const showRegisterForm = () => {
    setForm(false);
  };

  return (
    <div className="root-container">
      <div class="login-page-logo-container" onClick={(e) => history.push('/')}>
        <text id="login-page-logo-text">Shippose</text>
      </div>
      <div className="box-controller">
        <div
          className={`controller ${inLoginform ? 'selected-controller' : ''}`}
          onClick={showLoginForm}>
            Login
        </div>
        <div
          className={`controller ${!inLoginform ? 'selected-controller' : ''}`}
          onClick={showRegisterForm}>
            Register
        </div>
      </div>
      <div className="box-container">
        {inLoginform ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default LoginPage;
