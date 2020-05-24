import { ApolloProvider } from '@apollo/react-hooks';
import Profile from './Profile';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <ApolloProvider>
    <Profile />
  </ApolloProvider>
);

describe('Profile', () => {
  it('should render the Profile Component correctly', () => {   
    expect(Profile).toMatchSnapshot();
  });
});