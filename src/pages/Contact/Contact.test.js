import Contact from './Contact';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(<Contact />);

describe('Contact', () => {
  it('should render the Contact Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});