import AuthModal from './AuthModal';
import LoginForm from '../AuthForm/LoginForm.js';
import React from 'react';
import RegisterForm from '../AuthForm/RegisterForm.js';
import { shallow } from 'enzyme';

const loginType = 'login';
const registerType = 'register';
const isModalOpen = false;
const closeModal = () => {}

let wrapper = shallow( 
  <AuthModal
    isModalOpen={isModalOpen}
    closeModal={closeModal}
    type={loginType} />
);

describe('AuthModal', () => {
  it('should render the AuthModal Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  it('should contains Login Form if type is login', () => { 
    expect(wrapper).toContainReact(
      <LoginForm closeModal={closeModal} />
    );
  });
  it('should contains Register Form if type is not login', () => { 
    wrapper.setProps({ type: registerType });
    expect(wrapper).toContainReact(
      <RegisterForm closeModal={closeModal} />
    );
  });
});