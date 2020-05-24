import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

let wrapped = shallow(<App />);

describe('App', () => {
  it('should render the App Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
});