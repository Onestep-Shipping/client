import React from 'react';
import RegisterForm from './RegisterForm';
import { shallow } from 'enzyme';

const closeModal = () => {}

let wrapped = shallow( <RegisterForm closeModal={closeModal} />);

describe('RegisterForm', () => {
  it('should render the RegisterForm Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
});