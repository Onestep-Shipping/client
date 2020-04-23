import React, {useState, useCallback} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';
import {withRouter, useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';

const RegisterForm = () => {
  const history = useHistory();

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const onInputChange = (e, func) => {
    const value = e.currentTarget.value;
    func(value === null ? '' : value);
  };

  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
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
          errors.map((err) => {
            return <small className="danger-error">{err}</small>;
          })
        }
        <div class="info-container">
          <div class="company-info-container">
            <Input
              name="Company Name"
              type="text"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setCompanyName)}
              value={companyName}
            />

            <Input
              name="Address"
              type="address"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setAddress)}
              value={address}
            />

            <Input
              name="Telephone"
              type="phone"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setPhone)}
              value={phone}
            />

            <Input
              name="Tax ID"
              type="text"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setTaxId)}
              value={taxId}
            />
          </div>

          <div>
            <Input
              name="Person In-Charge"
              type="text"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setName)}
              value={name}
            />

            <Input
              name="Position"
              type="text"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setPosition)}
              value={position}
            />

            <Input
              name="Email"
              type="email"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setEmail)}
              value={email}
            />

            <Input
              name="Password"
              type="password"
              displayErrors={displayErrors}
              onChange={(e) => onInputChange(e, setPassword)}
              value={password}
            />
          </div>
        </div>
        <button className="login-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(RegisterForm);
