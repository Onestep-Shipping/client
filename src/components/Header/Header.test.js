import AuthProvider from '../../context/AuthContext.js';
import Header from './Header';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <AuthProvider>
    <Header />
  </AuthProvider>
);

describe('Header', () => {
  it('should render the Header Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});