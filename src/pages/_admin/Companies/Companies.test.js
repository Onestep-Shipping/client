import { ApolloProvider } from '@apollo/react-hooks';
import Companies from './Companies';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ApolloProvider>
    <Companies />
  </ApolloProvider>
);

describe('Companies', () => {
  it('should render the Companies Component correctly', () => {   
    expect(Companies).toMatchSnapshot();
  });
});