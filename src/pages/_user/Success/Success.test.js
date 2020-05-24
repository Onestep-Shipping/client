import React from 'react';
import Success from './Success';
import { shallow } from 'enzyme';

let wrapper = shallow(<Success />);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: () => ({
    type: 'booking',
  }),
}));

describe('Success', () => {
  it('should render the Success Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});