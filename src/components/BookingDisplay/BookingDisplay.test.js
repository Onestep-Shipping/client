import BookingDisplay from './BookingDisplay';
import React from 'react';
import { shallow } from 'enzyme';

const closeModal = () => {}

let wrapped = shallow( <BookingDisplay closeModal={closeModal} />);

describe('LoginForm', () => {
  it('should render the LoginForm Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
});