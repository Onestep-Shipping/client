import { gql } from 'apollo-boost';

const CREATE_BOL = gql`
  mutation createBOL($shipmentId: String!, $pdf: String!) {
    createBOL(shipmentId: $shipmentId, pdf: $pdf) {
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

export default CREATE_BOL;