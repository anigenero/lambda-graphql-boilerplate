import { ContextFunction } from 'apollo-server-core';
import { getAuthContext, User } from 'aws-cognito-graphql-directive';
import { APIGatewayEvent } from 'aws-lambda';
import { getCognitoUserPoolId, getCognitoUserRegion } from '../util/config';

export type GraphQLContext = {
	auth?: User;
};

/**
 * Generate the GraphQL context
 *
 * @param { [name: string]: string } headers
 */
export const generateContext: ContextFunction<{ event: APIGatewayEvent }, GraphQLContext> =
	async ({event: {headers}}) => ({
		auth: getCognitoUserRegion() && await getAuthContext(headers, {
			awsRegion: getCognitoUserRegion(),
			userPoolId: getCognitoUserPoolId()
		})
	});
