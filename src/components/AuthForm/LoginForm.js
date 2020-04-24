import React, {useState, useCallback} from 'react';
import './AuthForm.css';

import Input from '../Input/Input';
import {useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';

const LoginForm = () => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await app
          .auth()
          .signInWithEmailAndPassword(email, password);
      history.goBack();
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="inner-container">
      <div className="header">Login</div>
      <form className="box" onSubmit={handleLogin} noValidate>
        {errors.length > 0 &&
          errors.map((err, ind) => {
            return <small className="danger-error" key={ind}>{err}</small>;
          })
        }
        <Input name="Email" type="email" displayErrors={displayErrors} />

        <Input
          name="Password"
          type="password"
          displayErrors={displayErrors}
        />

        <button className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
