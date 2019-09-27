import { getApolloServer } from '../graphql';

// Apollo GraphQL Server handler
export const handler = getApolloServer().createHandler();
