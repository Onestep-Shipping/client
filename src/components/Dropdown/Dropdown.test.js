import Dropdown from './Dropdown';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <Dropdown
    content={<div />}
    type={'login'}
    onChange={() => {}}
    options={[]}
    isLoggedIn={false} 
  />
);

describe('Dropdown', () => {
  it('should render the Dropdown Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});