import Input from './Input';
import React from 'react';
import { shallow } from 'enzyme';

const label = 'User Email';
let wrapped = shallow(<Input name={label} type="email" displayErrors={false} />);
describe('Input', () => {
  it('should render the Input Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
  it('should renders the Input label', () => { 
    expect(wrapped.find('label').text()).toEqual(label);
  });
});