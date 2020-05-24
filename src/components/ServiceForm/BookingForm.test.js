import BookingForm from './BookingForm';
import React from 'react';
import { shallow } from 'enzyme';

const mockSubmit = jest.fn();

let wrapper = shallow(
  <BookingForm action={mockSubmit} />
);

describe('BookingForm', () => {
  it('should render the BookingForm Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});