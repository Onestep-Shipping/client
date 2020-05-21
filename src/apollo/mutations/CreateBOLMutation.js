import { gql } from 'apollo-boost';

const CREATE_BOL = gql`
  mutation createBOL($shipmentId: String!, $pdf: String!) {
    createBOL(shipmentId: $shipmentId, pdf: $pdf)
  }
`;

export default CREATE_BOL;