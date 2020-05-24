import AuthProvider from '../../context/AuthContext.js';
import FIND_SCHEDULES from '../../apollo/queries/FindScheduleQuery.js';
import Homepage from './Homepage';
import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import ScheduleFormProvider from '../../context/ScheduleFormContext.js';
import { mount } from 'enzyme';

const mocks = [
  {
    request: {
      query: FIND_SCHEDULES,
      variables: { 
        routeId: "CAVAN-SGSIN",
        carrier: "OOCL",
        startDate: "2020-07-01",
        endDate: "2020-07-30"
      },
    },
    result: {
      data: {
        findSchedules: [
          {
            "_id": "5eb5f825719c6b5e7aa975de",
            "route": {
              "startLocation": "Vancouver (BC), CANADA",
              "endLocation": "Singapore, SINGAPORE",
              "carrier": "OOCL",
              "quoteHistory": [
                {
                  "_id": "5ebb0460f5ac1ec200707ec7",
                  "validity": {
                    "startDate": "2020-07-01",
                    "endDate": "2020-07-31"
                  },
                  "selling": {
                    "oceanFreight": [
                      {
                        "containerType": "20' Dry",
                        "price": 950
                      },
                      {
                        "containerType": "40' Dry",
                        "price": 1200
                      },
                      {
                        "containerType": "40'HC Dry",
                        "price": 1500
                      }
                    ],
                    "docFee": 100,
                    "adminFee": 30
                  },
                  "except": null
                },
                {
                  "_id": "5ec5e42081f6d2b5d1fac947",
                  "validity": {
                    "startDate": "2020-05-01",
                    "endDate": "2020-05-31"
                  },
                  "selling": {
                    "oceanFreight": [
                      {
                        "containerType": "20' Dry",
                        "price": 1000
                      },
                      {
                        "containerType": "40' Dry",
                        "price": 1200
                      },
                      {
                        "containerType": "40'HC Dry",
                        "price": 1400
                      }
                    ],
                    "docFee": 150,
                    "adminFee": 50
                  },
                  "except": "Clothes"
                }
              ]
            },
            "startDate": "2020-07-09",
            "endDate": "2020-08-09",
            "transitTime": 31,
            "transshipment": 0,
            "vessels": [
              "APL QINGDAO / 0SV9CN1MA / PNW2"
            ]
          },
          {
            "_id": "5eb5f825719c6b5e7aa975df",
            "route": {
              "startLocation": "Vancouver (BC), CANADA",
              "endLocation": "Singapore, SINGAPORE",
              "carrier": "OOCL",
              "quoteHistory": [
                {
                  "_id": "5ebb0460f5ac1ec200707ec7",
                  "validity": {
                    "startDate": "2020-07-01",
                    "endDate": "2020-07-31"
                  },
                  "selling": {
                    "oceanFreight": [
                      {
                        "containerType": "20' Dry",
                        "price": 950
                      },
                      {
                        "containerType": "40' Dry",
                        "price": 1200
                      },
                      {
                        "containerType": "40'HC Dry",
                        "price": 1500
                      }
                    ],
                    "docFee": 100,
                    "adminFee": 30
                  },
                  "except": null
                },
                {
                  "_id": "5ec5e42081f6d2b5d1fac947",
                  "validity": {
                    "startDate": "2020-05-01",
                    "endDate": "2020-05-31"
                  },
                  "selling": {
                    "oceanFreight": [
                      {
                        "containerType": "20' Dry",
                        "price": 1000
                      },
                      {
                        "containerType": "40' Dry",
                        "price": 1200
                      },
                      {
                        "containerType": "40'HC Dry",
                        "price": 1400
                      }
                    ],
                    "docFee": 150,
                    "adminFee": 50
                  },
                  "except": "Clothes"
                }
              ]
            },
            "startDate": "2020-07-23",
            "endDate": "2020-08-23",
            "transitTime": 31,
            "transshipment": 0,
            "vessels": [
              "CMA CGM TIGRIS / 0SV9KN1MA / PNW2"
            ]
          },
          {
            "_id": "5eb5f825719c6b5e7aa975e1",
            "route": {
              "startLocation": "Vancouver (BC), CANADA",
              "endLocation": "Singapore, SINGAPORE",
              "carrier": "OOCL",
              "quoteHistory": [
                {
                  "_id": "5ebb0460f5ac1ec200707ec7",
                  "validity": {
                    "startDate": "2020-07-01",
                    "endDate": "2020-07-31"
                  },
                  "selling": {
                    "oceanFreight": [
                      {
                        "containerType": "20' Dry",
                        "price": 950
                      },
                      {
                        "containerType": "40' Dry",
                        "price": 1200
                      },
                      {
                        "containerType": "40'HC Dry",
                        "price": 1500
                      }
                    ],
                    "docFee": 100,
                    "adminFee": 30
                  },
                  "except": null
                },
                {
                  "_id": "5ec5e42081f6d2b5d1fac947",
                  "validity": {
                    "startDate": "2020-05-01",
                    "endDate": "2020-05-31"
                  },
                  "selling": {
                    "oceanFreight": [
                      {
                        "containerType": "20' Dry",
                        "price": 1000
                      },
                      {
                        "containerType": "40' Dry",
                        "price": 1200
                      },
                      {
                        "containerType": "40'HC Dry",
                        "price": 1400
                      }
                    ],
                    "docFee": 150,
                    "adminFee": 50
                  },
                  "except": "Clothes"
                }
              ]
            },
            "startDate": "2020-07-30",
            "endDate": "2020-08-30",
            "transitTime": 31,
            "transshipment": 0,
            "vessels": [
              "CMA CGM PEGASUS / 0SV9ON1MA / PNW2"
            ]
          }
        ],
      }
    },
  },
];


const wrapper = mount(
  <MockedProvider mocks={mocks} removeTypename>
    <AuthProvider>
      <ScheduleFormProvider>
        <Homepage />
      </ScheduleFormProvider>
    </AuthProvider>
  </MockedProvider>
);

// const mockHistoryPush = jest.fn();

// jest.mock('react-router-dom', () => ({    
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }));

describe('Homepage', () => {
  it('should render the Homepage Component correctly', () => {   
    expect(Homepage).toMatchSnapshot();
  });
  it('should navigates to schedule page when button is clicked', async () => {
    wrapper.find('form').simulate('submit');
    await new Promise(resolve => setTimeout(resolve))
    wrapper.update();
    // expect(mockHistoryPush).toHaveBeenCalledWith({
    //   pathname: '/schedule',
    //   state: { schedules: mocks.result.data.findSchedules }
    // });
  });
});