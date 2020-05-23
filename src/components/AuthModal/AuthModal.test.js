import AuthModal from './AuthModal';
import LoginForm from '../AuthForm/LoginForm.js';
import React from 'react';
import RegisterForm from '../AuthForm/RegisterForm.js';
import { shallow } from 'enzyme';

const loginType = 'login';
const registerType = 'register';
const isModalOpen = false;
const closeModal = () => {}

let wrappedLogin = shallow( 
  <AuthModal
    isModalOpen={isModalOpen}
    closeModal={closeModal}
    type={loginType} />
);

let wrappedRegister = shallow( 
  <AuthModal
    isModalOpen={isModalOpen}
    closeModal={closeModal}
    type={registerType} />
);

describe('AuthModal', () => {
  it('should render the AuthModal Component correctly', () => {   
    expect(wrappedLogin).toMatchSnapshot();
  });
  it('should contains Login Form if type is login', () => { 
    expect(wrappedLogin).toContainReact(
      <LoginForm closeModal={closeModal} />
    );
  });
  it('should contains Register Form if type is not login', () => { 
    expect(wrappedRegister).toContainReact(
      <RegisterForm closeModal={closeModal} />
    );
  });
});