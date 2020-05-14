import { gql } from 'apollo-boost';

const FIND_SCHEDULES = gql`
  query findSchedules($routeId: String!, $carrier: String!, $startDate: Date!, $endDate: Date!) {
    findSchedules(routeId: $routeId, carrier: $carrier, startDate: $startDate, endDate: $endDate) {
      route {
        startLocation
        endLocation
        carrier
        quoteHistory {
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