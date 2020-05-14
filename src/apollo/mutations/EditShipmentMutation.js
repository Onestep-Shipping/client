import { gql } from 'apollo-boost';

const ROLL_SHIPMENT = gql`
  mutation rollShipment($shipmentId: String!, $newScheduleId: String!) {
    rollShipment(shipmentId: $shipmentId, newScheduleId: $newScheduleId) {
      schedule {
        startDate
      }
    }
  }
`;

const CANCEL_SHIPMENT = gql`
  mutation cancelShipment($shipmentId: String!) {
    cancelShipment(shipmentId: $shipmentId) {
      schedule {
        startDate
      }
    }
  }
`;

export default { ROLL_SHIPMENT, CANCEL_SHIPMENT };