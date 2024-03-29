import { gql } from 'apollo-boost';

const GET_ALL_SHIPMENTS = gql`
  query {
    getMyShipments(companyId: "5ebb4f56b6a43ab1f1500127") {
      _id,
      schedule {
        _id,
        route { startLocation, endLocation, carrier }
        startDate, 
        endDate,
        transshipment,
        vessels,
        transitTime
      },
      bookingRequest {
        status,
        confirmation {
          pdf, bookingNo
        }
      },
      billInstruction {
        status, pdf
      },
      invoice {
        status, pdf
      },
      updatedAt,
    }
  }
`;

export default GET_ALL_SHIPMENTS;