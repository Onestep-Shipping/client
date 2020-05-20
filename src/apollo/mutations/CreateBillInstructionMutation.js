import { gql } from 'apollo-boost';

// TODO: check BillInstruction type

const CREATE_BILL_INSTRUCTION = gql`
  mutation createBillInstruction(
    $shipmentId: String!, $billInstruction: BillInstructionInputType!
  ) {
    createBillInstruction(
      shipmentId: $shipmentId, billInstruction: $billInstruction
    )
  }
`;

export default CREATE_BILL_INSTRUCTION;