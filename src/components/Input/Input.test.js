import Input from './Input';
import React from 'react';
import { shallow } from 'enzyme';

const label = 'User Email';
const camelizedLabel = 'userEmail';
const placeholder = "Email";
const type = "email";

let wrappedNoPlaceholder = shallow(
  <Input name={label} type={type} displayErrors={false} />
);
let wrappedWithPlaceholder = shallow(
  <Input name={label} type={type} placeholder={placeholder} displayErrors={true} />
);

describe('Input', () => {
  it('should render the Input Component correctly', () => {   
    expect(wrappedNoPlaceholder).toMatchSnapshot();
  });
  it('should renders the Input label', () => { 
    expect(wrappedNoPlaceholder.find('label').text()).toEqual(label);
  });
  it('should contains a label and an input', () => { 
    expect(wrappedNoPlaceholder).toContainReact(
      <label htmlFor={camelizedLabel} className="login-label">{label}</label>
    );
  });
  it('should have the props specified type', () => { 
    expect(wrappedWithPlaceholder.find('input').props().type).toEqual(type);
  });
  it('should have correct input\'s camelized name', () => { 
    expect(wrappedNoPlaceholder.find('input').props().name).toEqual(camelizedLabel);
  });
  it('should have the same placeholder value as label when placeholder props is empty', () => { 
    expect(wrappedNoPlaceholder.find('input').props().placeholder).toEqual(label);
  });
  it('should have the different placeholder value when placeholder props is filled', () => { 
    expect(wrappedWithPlaceholder.find('input').props().placeholder).toEqual(placeholder);
  });
  it('should have correct classname', () => { 
    expect(wrappedNoPlaceholder.find('input').props().className).toEqual('login-input ');
    expect(wrappedWithPlaceholder.find('input').props().className).toEqual('login-input display-errors');
  });
});