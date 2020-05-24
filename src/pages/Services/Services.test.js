import React from 'react';
import Services from './Services';
import { shallow } from 'enzyme';

let wrapper = shallow(<Services />);

describe('Services', () => {
  it('should render the Services Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});