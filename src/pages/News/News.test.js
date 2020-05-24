import News from './News';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(<News />);

describe('News', () => {
  it('should render the News Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});