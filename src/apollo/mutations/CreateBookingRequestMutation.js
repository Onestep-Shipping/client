import { gql } from 'apollo-boost';

// TODO: check BookingRequest type

const CREATE_BOOKING_REQUEST = gql`
  mutation createBookingRequestAndInitShipment(
    $companyId: String!, 
    $scheduleId: String!, 
    $quoteId: String!, 
    $bookingRequest: BookingRequestInputType!
  ) {
    createBookingRequestAndInitShipment(
      companyId: $companyId, 
      scheduleId: $scheduleId, 
      quoteId: $quoteId, 
      bookingRequest: $bookingRequest
    )
  }
`;

export default CREATE_BOOKING_REQUEST;