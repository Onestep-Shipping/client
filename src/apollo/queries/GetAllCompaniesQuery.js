import { gql } from 'apollo-boost';

const GET_ALL_COMPANIES = gql`
  query {
    getAllCompanies {
      createdAt,
      name, 
      address {
        country
      }, 
      phone, 
      taxId,
      personInCharge { 
        name, position 
      },
      email,
      shipments {
        createdAt
      },
    }
  }
`;

export default GET_ALL_COMPANIES;