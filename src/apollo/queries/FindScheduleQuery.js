import { gql } from 'apollo-boost';

const FIND_SCHEDULES = gql`
  query findSchedules($routeId: String!, $carrier: String!, $startDate: Date!, $endDate: Date!) {
    findSchedules(
      routeId: $routeId, carrier: $carrier, startDate: $startDate, endDate: $endDate
    ) {
      _id
      route {
        startLocation
        endLocation
        carrier
        quoteHistory {
          _id
          validity {
            startDate
            endDate
          }
          selling {
            oceanFreight {
              containerType
              price
            }
            docFee
            adminFee
          }
          except
        }
      }
      startDate
      endDate
      transitTime
      transshipment
      vessels
    }
  }
`;

export default FIND_SCHEDULES;