import About from './About';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(<About />);

describe('About', () => {
  it('should render the About Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});