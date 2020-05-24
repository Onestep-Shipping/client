import { ApolloProvider } from '@apollo/react-hooks';
import QuoteUpdate from './QuoteUpdate';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ApolloProvider>
    <QuoteUpdate />
  </ApolloProvider>
);

describe('Invoice', () => {
  it('should render the Invoice Component correctly', () => {   
    expect(QuoteUpdate).toMatchSnapshot();
  });
});