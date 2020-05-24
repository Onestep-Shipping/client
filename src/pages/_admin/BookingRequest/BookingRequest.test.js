import { ApolloProvider } from '@apollo/react-hooks';
import BookingRequest from './BookingRequest';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ApolloProvider>
    <BookingRequest />
  </ApolloProvider>
);

describe('BookingRequest', () => {
  it('should render the BookingRequest Component correctly', () => {   
    expect(BookingRequest).toMatchSnapshot();
  });
});