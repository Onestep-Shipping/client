import { gql } from 'apollo-boost';

// TODO: check BillInstruction type

const CREATE_BILL_INSTRUCTION = gql`
  mutation createBillInstruction(
    $shipmentId: String!, $billInstruction: BillInstruction!
  ) {
    createBillInstruction(
      shipmentId: $shipmentId, billInstruction: $billInstruction
    ) {
      shipper
    }
  }
`;

export default CREATE_BILL_INSTRUCTION;