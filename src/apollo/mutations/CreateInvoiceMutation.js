import { gql } from 'apollo-boost';

const CREATE_INVOICE = gql`
  mutation createInvoice($shipmentId: String!, $pdf: String!, $invoice: InvoiceInputType!) {
    createInvoice(shipmentId: $shipmentId, pdf: $pdf, invoice: $invoice)
  }
`;

export default CREATE_INVOICE;