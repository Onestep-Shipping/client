import { ApolloProvider } from '@apollo/react-hooks';
import BolForm from './BolForm';
import React from 'react';
import { shallow } from 'enzyme';

const mockSubmit = jest.fn();
const id = "12345";

let wrapper = shallow(
  <ApolloProvider>
    <BolForm action={mockSubmit} shipmentId={id} />
  </ApolloProvider>
);

describe('BolForm', () => {
  it('should render the BolForm Component correctly', () => {   
    expect(BolForm).toMatchSnapshot();
  });
});