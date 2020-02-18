import { ApolloServer } from 'apollo-server-lambda';
import { AuthDirective, authTypeDefs } from 'aws-cognito-graphql-directive';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { merge } from 'lodash';
import { generateContext, GraphQLContext } from './context';
import { Resolvers } from './graphql.generated';
import { dateScalar } from './scalar/date.scalar';
import { dateTimeScalar } from './scalar/datetime.scalar';
import typeDefs from './schema.graphql';

const resolvers: Resolvers<GraphQLContext> = {

	// scalars
	Date: dateScalar,
	DateTime: dateTimeScalar

};

export const getApolloServer = () =>
	new ApolloServer({
		context: generateContext,
		formatError: (error: GraphQLError): GraphQLFormattedError => ({
			extensions: error.extensions,
			locations: null,
			message: error.message,
			path: null
		}),
		typeDefs: merge(authTypeDefs, typeDefs),
		resolvers,
		schemaDirectives: {
			auth: AuthDirective
		}
	});
