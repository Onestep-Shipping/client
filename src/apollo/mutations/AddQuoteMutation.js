import { gql } from 'apollo-boost';

// TODO: check Quote type

const ADD_QUOTE = gql`
  mutation addQuoteToSchedules($routeId: String!, $carrier: String!, $quote: Quote!) {
    addQuoteToSchedules(routeId: $routeId, carrier: $carrier, quote: $quote) {
      validity {
        startDate
        endDate
      }
      buying {
        oceanFreight {
          containerType
          price
        }
        docFee
        adminFee
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
`;

export default ADD_QUOTE;