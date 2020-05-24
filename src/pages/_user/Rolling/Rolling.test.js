import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Rolling from './Rolling';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <MemoryRouter>  
    <Rolling />
  </MemoryRouter>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: () => ({
    id: '123456',
  }),
}));

describe('Rolling', () => {
  it('should render the Rolling Component correctly', () => {   
    expect(Rolling).toMatchSnapshot();
  });
});