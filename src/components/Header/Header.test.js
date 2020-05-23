import AuthProvider from '../../context/AuthContext.js';
import Dropdown from '../Dropdown/Dropdown.js';
import Header from './Header';
import React from 'react';
import { mount } from 'enzyme';

const wrapper = mount(
  <AuthProvider>
    <Header />
  </AuthProvider>
);

const logoText = "OneStep Shipping";

describe('Header', () => {
  it('should render the Header Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  it('should renders the Logo text', () => { 
    expect(wrapper.find('.logo-text').text()).toEqual(logoText);
  });
  it('should alway have only 2 dropdowns', () => {
    expect(wrapper.find(Dropdown).length).toBe(2); 
  });
});