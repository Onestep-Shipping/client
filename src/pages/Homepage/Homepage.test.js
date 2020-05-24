import Homepage from './Homepage';
import React from 'react';
import ScheduleFormProvider from '../../context/ScheduleFormContext.js';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ScheduleFormProvider>
    <Homepage />
  </ScheduleFormProvider>
);

describe('Homepage', () => {
  it('should render the Homepage Component correctly', () => {   
    expect(Homepage).toMatchSnapshot();
  });
});