import AuthProvider from '../../context/AuthContext.js';
import Dropdown from '../Dropdown/Dropdown.js';
import Header from './Header';
import HeaderText from '../HeaderText/HeaderText.js';
import { MemoryRouter } from 'react-router-dom'
import React from 'react';
import { mount } from 'enzyme';

const mockHistoryPush = jest.fn();
const mockLoginHandle = jest.fn();

const wrapper = mount(
  <AuthProvider>
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  </AuthProvider>
);

const logoText = "OneStep Shipping";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Header', () => {
  it('should render the Header Component correctly', () => {   
    expect(wrapper.find(Header)).toMatchSnapshot();
  });
  it('should renders the Logo text', () => { 
    expect(wrapper.find('.logo-text').text()).toEqual(logoText);
  });
  it('should navigate to hompage when logo is clicked', () => {
    wrapper.find('.logo-text').simulate('click'); 
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
  it('should alway have only 2 dropdowns', () => {
    expect(wrapper.find(Dropdown).length).toBe(2); 
  });
  it('should alway have only 4 options on nav bar', () => {
    expect(wrapper.find(HeaderText).length).toBe(4); 
  });
});