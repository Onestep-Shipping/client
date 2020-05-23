import { gql } from 'apollo-boost';

const GET_INVOICE_REQUEST = gql`
  query {
    getAllShipments(sortBy: "billInstruction") {
      _id,
      schedule {
        route {
          startLocation, endLocation, carrier, 
          quoteHistory {
            validity {
              startDate, endDate
            },
            buying {
              oceanFreight {
                containerType,
                price
              },
              docFee, adminFee
            },
            selling {
              oceanFreight {
                containerType,
                price
              },
              docFee, adminFee
            },
          }
        }
        startDate, 
        endDate, 
        transitTime, 
        transshipment, 
        vessels
      },
      bookedBy {
        name,
        address {
          street, city, country
        },
        personInCharge {
          name
        },
        email
      },
      bookingRequest {
        confirmation { bookingNo, etd },
        form { 
          commodity, 
          containers {
            containerType,
            quantity
          }
        },
      },
      billInstruction {
        form { orderNo, updatedAt }
      },
      invoice {
        tempCost, pdf,
        form { cost, revenue, profit }
      }
    }
  }
`;

export default GET_INVOICE_REQUEST;