import { gql } from 'apollo-boost';

// TODO: check BookingRequest type

const CREATE_BOOKING_REQUEST = gql`
  mutation createBookingRequestAndInitShipment($companyId: String!, $scheduleId: String!, $quoteId: String!, $bookingRequest: BookingRequest!) {
    createBookingRequestAndInitShipment(
      companyId: $companyId, 
      scheduleId: $scheduleId, 
      quoteId: $quoteId, 
      bookingRequest: $bookingRequest
    ) {
      schedule {
        route {
          startLocation
          endLocation
          carrier
        }
        startDate
        endDate
        transitTime
        transshipment
        vessels
      }
    }
  }
`;

export default CREATE_BOOKING_REQUEST;