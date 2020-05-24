import Form from './Form';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <MemoryRouter>
    <Form />
  </MemoryRouter>);

describe('Form', () => {
  it('should render the Form Component correctly', () => {   
    expect(Form).toMatchSnapshot();
  });
});