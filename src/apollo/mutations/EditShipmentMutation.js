import { gql } from 'apollo-boost';

const ROLL_SHIPMENT = gql`
  mutation rollShipment($shipmentId: String!, $newScheduleId: String!) {
    rollShipment(shipmentId: $shipmentId, newScheduleId: $newScheduleId)
  }
`;

const CANCEL_SHIPMENT = gql`
  mutation cancelShipment($shipmentId: String!) {
    cancelShipment(shipmentId: $shipmentId)
  }
`;

export { ROLL_SHIPMENT, CANCEL_SHIPMENT };