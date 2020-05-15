import { gql } from 'apollo-boost';

// TODO: check Invoice type

const CREATE_INVOICE = gql`
  mutation createInvoice($shipmentId: String!, $pdf: String!, $invoice: Invoice!) {
    createInvoice(shipmentId: $shipmentId, pdf: $pdf, invoice: $invoice) {
      cost
      revenue
      profit
    }
  }
`;

export default CREATE_INVOICE;