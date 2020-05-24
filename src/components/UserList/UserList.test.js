import React from 'react';
import UserList from './UserList';
import { shallow } from 'enzyme';

const mockIndexChange = jest.fn();

let wrapper = shallow(
  <UserList 
    setInd={mockIndexChange}
    opt={[]} type="bol" />
);

describe('UserList', () => {
  it('should render the UserList Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});