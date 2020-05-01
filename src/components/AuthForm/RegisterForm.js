/* eslint-disable no-unused-vars */
import React, {useState, useCallback} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';
import app from '../../firebase/base.js';
import PropTypes from 'prop-types';

const RegisterForm = (props) => {
  const { closeModal } = props;

  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);


  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    const email = e.target[6].value;
    const password = e.target[7].value;
    if (email.length > 0 && password.length > 0) {
      try {
        await app
            .auth()
            .createUserWithEmailAndPassword(email, password);
        closeModal();
      } catch (error) {
        alert(error);
      }
    }
  }, [closeModal]);

  return (
    <div className="inner-container">
      <div className="header">Register</div>
      <form className="register-box" onSubmit={handleSignUp} noValidate>
        {errors.length > 0 &&
          errors.map((err, ind) => <small className="danger-error" key={ind}>{err}</small>)
        }
        <div className="all-texfield-register-container">
          <div className="company-info-container">
            <Input name="Company Name" type="text" displayErrors={displayErrors} />
            <Input name="Address" type="address" 
              displayErrors={displayErrors} 
              placeholder="Street"
            />
            <Input name="" type="address" 
              displayErrors={displayErrors} 
              placeholder="City, Province & Postal Code"
            />
            <Input name="" type="address" 
              displayErrors={displayErrors} 
              placeholder="Country"
            />
            <Input name="Telephone" type="phone" displayErrors={displayErrors} />
          </div>
          <div>
            <Input name="Tax ID" type="text" displayErrors={displayErrors} />
            <Input name="Person In-Charge" type="text" displayErrors={displayErrors} />
            <Input name="Position" type="text" displayErrors={displayErrors} />
            <Input name="Email" type="email" displayErrors={displayErrors} />
            <Input name="Password" type="password" displayErrors={displayErrors} />
          </div>
        </div>
        <button className="login-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterForm;

RegisterForm.propTypes = {
  closeModal: PropTypes.func,
};
