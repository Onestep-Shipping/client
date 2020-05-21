import { gql } from 'apollo-boost';

// TODO: check BookingConfirmation type

const CREATE_BOOKING_CONFIRMATION = gql`
  mutation createBookingConfirmation(
    $shipmentId: String!, $bookingConfirmation: BookingConfirmationInputType!
  ) {
    createBookingConfirmation(
      shipmentId: $shipmentId, bookingConfirmation: $bookingConfirmation
    )
  }
`;

export default CREATE_BOOKING_CONFIRMATION;