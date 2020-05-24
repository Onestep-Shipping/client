import { ApolloProvider } from '@apollo/react-hooks';
import Invoice from './Invoice';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ApolloProvider>
    <Invoice />
  </ApolloProvider>
);

describe('Invoice', () => {
  it('should render the Invoice Component correctly', () => {   
    expect(Invoice).toMatchSnapshot();
  });
});