import Input from './Input';
import React from 'react';
import { shallow } from 'enzyme';

const label = 'User Email';
const camelizedLabel = 'userEmail';
const placeholder = "Email";
const type = "email";

let wrapper = shallow(
  <Input name={label} type={type} displayErrors={false} />
);

describe('Input', () => {
  it('should render the Input Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  it('should renders the Input label', () => { 
    expect(wrapper.find('label').text()).toEqual(label);
  });
  it('should contains a label and an input', () => { 
    expect(wrapper).toContainReact(
      <label htmlFor={camelizedLabel} className="login-label">{label}</label>
    );
  });
  it('should have correct input\'s camelized name', () => { 
    expect(wrapper.find('input').props().name).toEqual(camelizedLabel);
  });
  it('should have the same placeholder value as label when placeholder props is empty', () => { 
    expect(wrapper.find('input').props().placeholder).toEqual(label);
  });
  it('should have the props specified type', () => { 
    expect(wrapper.find('input').props().type).toEqual(type);
  });
  it('should have the different placeholder value when placeholder props is filled', () => { 
    wrapper.setProps({ placeholder });
    expect(wrapper.find('input').props().placeholder).toEqual(placeholder);
  });
  it('should have correct classname', () => {
    expect(wrapper.find('input').props().className).toEqual('login-input ');
   
    wrapper.setProps({ displayErrors: true });
    expect(wrapper.find('input').props().className).toEqual('login-input display-errors');
  });
});