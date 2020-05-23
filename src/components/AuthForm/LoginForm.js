import './AuthForm.css';

/* eslint-disable no-unused-vars */
import React, {useCallback, useState} from 'react';

import Input from '../Input/Input';
import PropTypes from 'prop-types';
import app from '../../firebase/base.js';

const LoginForm = (props) => {
  const { closeModal } = props;

  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (email.length > 0 && password.length > 0) {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        closeModal();
      } catch (error) {
        alert(error);
      }
    }
  }, [closeModal]);

  return (
    <div className="inner-container">
      <div className="header">
        <span className="schedule-header-text">Login</span>
      </div>
      <form className="box" onSubmit={handleLogin} noValidate>
        {errors.length > 0 &&
          errors.map((err, ind) => <small className="danger-error" key={ind}>{err}</small>)}
        <Input name="Email" type="email" displayErrors={displayErrors} />
        <Input name="Password" type="password" displayErrors={displayErrors} />
        <button className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  closeModal: PropTypes.func,
};
