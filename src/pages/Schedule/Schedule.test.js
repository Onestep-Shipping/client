import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Schedule from './Schedule';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <MemoryRouter>
    <Schedule />
  </MemoryRouter>
);

describe('Schedule', () => {
  it('should render the Schedule Component correctly', () => {   
    expect(Schedule).toMatchSnapshot();
  });
});