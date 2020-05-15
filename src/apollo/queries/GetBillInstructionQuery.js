import { gql } from 'apollo-boost';

const GET_BILL_INSTRUCTION = gql`
  query getBillInstruction($sortBy: String!) {
    getAllShipments(sortBy: "billInstruction") {
      schedule {
        route {
          startLocation, endLocation, 
          quoteHistory {
            validity {
              startDate, endDate
            },
            selling {
              oceanFreight {
                containerType,
                price
              },
              docFee, adminFee
            },
          }
        }
        startDate, 
        endDate, 
        vessels
      },
      bookedBy {
        name,
        personInCharge {
          name
        },
        email
      },
      billInstruction {
        form {
          shipper,
          consignee,
          notify,
          description,
          containers {
            containerNo, seelNo, weight, measurement, vgm
          }
          orderNo,
          hsCode,
          caedNo,
          cargoValue,
          createdAt
        }
        status
      }
    }
  }
`;

export default GET_BILL_INSTRUCTION;