import FixedSizeList from './FixedSizeList';
import React from 'react';
import { shallow } from 'enzyme';

let wrapper = shallow(
  <FixedSizeList 
    headers={[]} 
    data={[]} 
    row={<div />}
  />
);

describe('FixedSizeList', () => {
  it('should render the FixedSizeList Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
});