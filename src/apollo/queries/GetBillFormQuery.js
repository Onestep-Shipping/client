import { gql } from 'apollo-boost';

const GET_BILL_FORM = gql`
  query getBillForm($shipmentId: String!) {
    getBillForm(shipmentId: $shipmentId) {
      shipper, consignee, notify, description,
      containers {
        containerNo, seelNo, weight, measurement, vgm,
      }
      orderNo, hsCode, caedNo, cargoValue
    }
  }
`;

export default GET_BILL_FORM;