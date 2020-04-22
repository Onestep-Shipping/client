import React, {useState} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const onEmailChange = (e) => {
    const value = e.currentTarget.value;
    setEmail(value === null ? '' : value);
  };

  const onPasswordChange = (e) => {
    const value = e.currentTarget.value;
    if (value !== null) {
      setPassword(value);
    }
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
            onChange={onEmailChange}
            value={email}
          />

          <Input
            name="Address"
            type="address"
            displayErrors={displayErrors}
            onChange={onEmailChange}
            value={email}
          />

          <Input
            name="Telephone"
            type="phone"
            displayErrors={displayErrors}
            onChange={onEmailChange}
            value={email}
          />
        </div>

        <div>
          <Input
            name="Your Name"
            type="text"
            displayErrors={displayErrors}
            onChange={onEmailChange}
            value={email}
          />

          <Input
            name="Position"
            type="text"
            displayErrors={displayErrors}
            onChange={onEmailChange}
            value={email}
          />

          <Input
            name="Tax ID"
            type="text"
            displayErrors={displayErrors}
            onChange={onEmailChange}
            value={email}
          />

          <Input
            name="Email"
            type="email"
            displayErrors={displayErrors}
            onChange={onEmailChange}
            value={email}
          />

          <Input
            name="Password"
            type="password"
            displayErrors={displayErrors}
            onChange={onPasswordChange}
            value={password}
          />

          <button className="login-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
