import { ApolloProvider } from '@apollo/react-hooks';
import BOLInstruction from './BOLInstruction';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ApolloProvider>
    <BOLInstruction />
  </ApolloProvider>
);

describe('BOLInstruction', () => {
  it('should render the BOLInstruction Component correctly', () => {   
    expect(BOLInstruction).toMatchSnapshot();
  });
});