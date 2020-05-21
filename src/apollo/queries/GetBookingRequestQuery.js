import { gql } from 'apollo-boost';

const GET_BOOKING_REQUEST = gql`
  query {
    getAllShipments(sortBy: "bookingRequest") {
      _id,
      schedule {
        route {
          startLocation, endLocation, carrier, 
          quoteHistory {
            validity {
              startDate, endDate
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
        form {
          commodity, hsCode, 
          containers {
            containerType, quantity
          },
          paymentTerm, autoFilling, createdAt
        }, 
        status
      },
    }
  }
`;

export default GET_BOOKING_REQUEST;