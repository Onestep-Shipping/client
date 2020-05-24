import HeaderText from './HeaderText';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { mount } from 'enzyme';

const mockHistoryPush = jest.fn();
const value = "Contact";

let wrapper = mount(
  <MemoryRouter>
    <HeaderText value={value} />
  </MemoryRouter>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('HeaderText', () => {
  it('should render the HeaderText Component correctly', () => {   
    expect(wrapper.find(HeaderText)).toMatchSnapshot();
  });
  it('should renders the props value', () => { 
    expect(wrapper.find('span').text()).toEqual(value);
  });
  it('navigates to the given value\' url', () => { 
    wrapper.simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/' + value.toLowerCase());
  });
});