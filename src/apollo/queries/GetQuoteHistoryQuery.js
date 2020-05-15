import { gql } from 'apollo-boost';

const GET_QUOTE_HISTORY = gql`
  query getQuoteHistory(
    $routeId: String!, $carrier: String!, $startDate: Date!, $endDate: Date!
  ) {
    getQuoteHistory(
      routeId: $routeId, carrier: $carrier, startDate: $startDate, endDate: $endDate
    ) {
      validity { 
        startDate,
        endDate
      }
      buying {
        oceanFreight {
          containerType, price
        },
        docFee, 
        adminFee
      }, 
      selling {
        oceanFreight {
          containerType, price
        },
        docFee, 
        adminFee
      }, 
      except
    }
  }
`;

export default GET_QUOTE_HISTORY;