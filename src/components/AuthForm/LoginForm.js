import React, {useState, useCallback} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';
import {useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';

const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const onInputChange = useCallback((e, func) => {
    const value = e.currentTarget.value;
    func(value === null ? '' : value);
  }, []);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    try {
      await app
          .auth()
          .signInWithEmailAndPassword(email, password);
      history.goBack();
    } catch (error) {
      alert(error);
    }
  }, [history, email, password]);

  return (
    <div className="inner-container">
      <div className="header">Login</div>
      <form className="box" onSubmit={handleLogin} noValidate>
        {errors.length > 0 &&
          errors.map((err, ind) => {
            return <small className="danger-error" key={ind}>{err}</small>;
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
