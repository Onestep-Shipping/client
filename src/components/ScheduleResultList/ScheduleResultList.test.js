import AuthProvider from '../../context/AuthContext.js';
import React from 'react';
import ScheduleResultList from './ScheduleResultList';
import { shallow } from 'enzyme';

const mockSubmit = jest.fn();

let wrapper = shallow( 
  <AuthProvider>
    <ScheduleResultList 
      action={mockSubmit} 
      scheduleList={[]} />
  </AuthProvider>
);

describe('ScheduleResultList', () => {
  it('should render the ScheduleResultList Component correctly', () => {   
    expect(ScheduleResultList).toMatchSnapshot();
  });
});