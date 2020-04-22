import React, {useState} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';

const LoginForm = () => {
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
      <div className="header">Login</div>
      <form className="box" onSubmit={(e) => submitLogin(e)} noValidate>
        {errors.length > 0 &&
          errors.map((err) => {
            return <small className="danger-error">{err}</small>;
          })
        }
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

        <button className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
