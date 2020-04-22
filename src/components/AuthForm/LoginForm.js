import React, {useState} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';

const LoginForm = () => {
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

        <button className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
