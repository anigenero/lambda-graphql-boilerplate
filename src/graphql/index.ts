import { ApolloServer } from 'apollo-server-lambda';
import { AuthDirective, authTypeDefs } from 'aws-cognito-graphql-directive';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { merge } from 'lodash';
import { generateContext, IGraphQLContext } from './context';
import { Resolvers } from './graphql.generated';
import { dateScalar } from './scalar/date.scalar';
import { dateTimeScalar } from './scalar/datetime.scalar';
import typeDefs from './schema.graphql';

const resolvers: Resolvers<IGraphQLContext> = {

	// scalars
	Date: dateScalar,
	DateTime: dateTimeScalar

};

export const getApolloServer = () =>
	new ApolloServer({
		context: generateContext,
		formatError(error: GraphQLError): GraphQLFormattedError {
			return ({
				extensions: error.extensions,
				locations: undefined,
				message: error.message,
				path: undefined
			});
		},
		typeDefs: merge(authTypeDefs, typeDefs),
		resolvers,
		schemaDirectives: {
			auth: AuthDirective
		}
	});
