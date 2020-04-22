import React, {useState} from 'react';
import './LoginPage.css';
import LoginForm from '../../components/AuthForm/LoginForm.js';
import RegisterForm from '../../components/AuthForm/RegisterForm.js';

const LoginPage = () => {
  const [inLoginform, setForm] = useState(true);

  const showLoginForm = () => {
    setForm(true);
  };

  const showRegisterForm = () => {
    setForm(false);
  };

  return (
    <div className="root-container">
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
