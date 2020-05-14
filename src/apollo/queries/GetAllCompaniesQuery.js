import { gql } from 'apollo-boost';

const GET_ALL_COMPANIES = gql`
  query {
    getAllCompanies {
      name, 
      address, 
      phone, 
      taxId,
      personInCharge { 
        name, position 
      },
      email,
      shipments {
        schedule {
          startDate
        }
      }
    }
  }
`;

export default GET_ALL_COMPANIES;