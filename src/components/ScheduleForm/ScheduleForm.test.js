import React from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleFormProvider from '../../context/ScheduleFormContext.js';
import { shallow } from 'enzyme';
import styles from './ScheduleForm.module.css';

const mockSubmit = jest.fn();

let wrapper = shallow( 
  <ScheduleFormProvider>
    <ScheduleForm styles={styles} onSubmit={mockSubmit}/>
  </ScheduleFormProvider>
);

describe('ScheduleForm', () => {
  it('should render the ScheduleForm Component correctly', () => {   
    expect(ScheduleForm).toMatchSnapshot();
  });
  it('should have the correct styles', () => {   
     expect(wrapper.find(ScheduleForm).props().styles).toBe(styles);
  });
});