import HeaderText from './HeaderText';
import React from 'react';
import { shallow } from 'enzyme';

const value = "Contact";
const action = jest.fn();

let wrapper = shallow(
  <HeaderText value={value} action={action} />
);

describe('HeaderText', () => {
  it('should render the HeaderText Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  it('should renders the props value', () => { 
    expect(wrapper.find('span').text()).toEqual(value);
  });
  it('should trigger the action when clicked', () => { 
    wrapper.simulate('click');
    expect(action).toHaveBeenCalled();
  });
});