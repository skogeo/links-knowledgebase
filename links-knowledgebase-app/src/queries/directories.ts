import { gql } from '@apollo/client';

export const GET_DIRECTORIES = gql`
  query Directories {
    directories {
      data {
        attributes {
          parent {
            data {
              attributes {
                name
              }
            }
          }
          type
          name
          children {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
}
`;

export const GET_DIRECTORIES_SEARCH = gql`
  query GetDirectories($searchString: String!) {
    directories(
      filters: {
        name: {
          contains: $searchString
        }
      }
    ) {
      data {
        id
        attributes {
          parent
          name
          children {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
