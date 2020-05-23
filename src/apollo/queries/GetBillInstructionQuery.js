import { gql } from 'apollo-boost';

const GET_BILL_INSTRUCTION = gql`
  query {
    getAllShipments(sortBy: "billInstruction") {
      _id,
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
          updatedAt
        },
        pdf,
        status
      }
    }
  }
`;

export default GET_BILL_INSTRUCTION;