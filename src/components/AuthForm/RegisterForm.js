import React, {useState, useCallback} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';
import {withRouter, useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';

const RegisterForm = () => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);


  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    
    // const companyName = e.target[0].value;
    // const address = e.target[1].value;
    // const phone = e.target[2].value;
    // const taxID = e.target[3].value;
    // const personInCharge = e.target[4].value;
    // const position = e.target[5].value;
    const email = e.target[6].value;
    const password = e.target[7].value;

    try {
      await app
          .auth()
          .createUserWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="inner-container">
      <div className="header">Register</div>
      <form className="register-box" onSubmit={handleSignUp} noValidate>
        {errors.length > 0 &&
          errors.map((err, ind) => {
            return <small className="danger-error" key={ind}>{err}</small>;
          })
        }
        <div className="all-texfield-register-container">
          <div className="company-info-container">
            <Input name="Company Name" type="text" displayErrors={displayErrors} />
            <Input name="Address" type="address" displayErrors={displayErrors} />
            <Input name="Telephone" type="phone" displayErrors={displayErrors} />
            <Input name="Tax ID" type="text" displayErrors={displayErrors} />
          </div>
          <div>
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

export default withRouter(RegisterForm);
