import FixedSizeList from './FixedSizeList';
import React from 'react';
import { shallow } from 'enzyme';

const row = (shipment, ind) => {
  return (<div key={ind} />);
};

const dataSize = 20;
const listSize = 5;

let wrapper = shallow(
  <FixedSizeList 
    headers={Array(dataSize).fill("Headers")} 
    data={Array(dataSize).fill("Data")} 
    row={row}
  />
);

describe('FixedSizeList', () => {
  it('should render the FixedSizeList Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  it('should have the correct max page number', () => {  
    wrapper.find("#prev-button").simulate('click');
    expect(
      wrapper.find("#current-page").text().split(" / ")[1]
    ).toEqual((dataSize / listSize).toString());
  });
  it('should not go to previous page if previous button is clicked', () => { 
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 1");
     
    wrapper.find("#prev-button").simulate('click');
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 1");
  });
  it('should go to next page if previous button is clicked', () => {  
    wrapper.find("#next-button").simulate('click');
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 2");

    wrapper.find("#next-button").simulate('click');
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 3");

    wrapper.find("#next-button").simulate('click');
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 4");
  });
  it('should not go to previous page if previous button is clicked', () => { 
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 4");
     
    wrapper.find("#next-button").simulate('click');
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 4");
  });
  it('should go to previous page if previous button is clicked', () => {  
    wrapper.find("#prev-button").simulate('click');
    expect(wrapper.find("#current-page").text().split(" / ")[0]).toEqual("Page 3");
  });
});