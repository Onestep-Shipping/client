import React, {useState} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';

const RegisterForm = () => {
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

  const submitLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="inner-container">
      <div className="header">Register</div>
      <form className="register-box" onSubmit={(e) => submitLogin(e)} noValidate>
        {errors.length > 0 &&
          errors.map((err) => {
            return <small className="danger-error">{err}</small>;
          })
        }
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
        </div>

        <div>
          <Input
            name="Your Name"
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
            name="Tax ID"
            type="text"
            displayErrors={displayErrors}
            onChange={(e) => onInputChange(e, setTaxId)}
            value={taxId}
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

          <button className="login-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
