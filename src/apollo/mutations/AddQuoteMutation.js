import { gql } from 'apollo-boost';

// TODO: check Quote type

const ADD_QUOTE = gql`
  mutation addQuoteToSchedules($routeId: String!, $carrier: String!, $quote: QuoteInputType!) {
    addQuoteToSchedules(routeId: $routeId, carrier: $carrier, quote: $quote)
  }
`;

export default ADD_QUOTE;