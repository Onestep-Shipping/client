import BookingDisplay from './BookingDisplay';
import React from 'react';
import { shallow } from 'enzyme';

const schedule = {
  route: {
    startLocation: 'Vancouver, BC | CA',
    endLocation: 'Vung Tau | VN',
    carrier: 'Hapag-Lloyd',
  },
  startDate: '04/21/2020',
  endDate: '04/21/2020',
  transitTime: 35,
  transshipment: 0,
  vessels: 'YM UPSURGENCE / 043W / PN2',
};

const quote = {
  validity: {
    startDate: '04/21/2020',
    endDate: '04/21/2020'
  },
  selling: {
    oceanFreight: [
      {
        containerType: "40'HC Dry",
        price: 1000
      }
    ],
    docFee: 100,
    adminFee: 100,
  },
  except: "Garment, Waste, Agricural Products, etc.",
};
const originalFields = 3;
const greaterThanThreeFields = 5;
const greaterThanFiveFields = 9;

let wrapper = shallow( 
  <BookingDisplay 
    schedule={schedule} 
    quote={quote} 
    fields={originalFields}
  />
);

describe('BookingDisplay', () => {
  it('should render the BookingDisplay Component correctly', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  it('should have the correct # of fields', () => {
    for (let i = 0; i < 7; i++) {
      let expectedFields;
      if (i > 5) {
        expectedFields = greaterThanFiveFields;
      } else if (i > 3) {
        expectedFields = greaterThanThreeFields;
      } else {
        expectedFields = originalFields
      }
      wrapper.setProps({ fields: i });
      expect(wrapper.find('.info-row').length).toBe(expectedFields);
    }
  });
});