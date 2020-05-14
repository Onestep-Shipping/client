import { gql } from 'apollo-boost';

const GET_INVOICE_REQUEST = gql`
  query getInvoiceRequest($sortBy: String!) {
    getAllShipments(sortBy: "billInstruction") {
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
        personInCharge {
          name
        },
        email
      },
      bookingRequest {
        confirmation { bookingNo },
        form { commodity },
      },
      billInstruction {
        form { orderNo }
      }
      invoice {
        tempCost
      }
    }
  }
`;

export default GET_INVOICE_REQUEST;