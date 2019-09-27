import { ContextFunction } from 'apollo-server-core';
import { getAuthContext, User } from 'aws-cognito-graphql-directive';
import { APIGatewayEvent } from 'aws-lambda';
import { getCognitoUserPoolId, getCognitoUserRegion } from '../util/config';

export interface IGraphQLContext {
	auth: User;
}

/**
 * Generate the GraphQL context
 *
 * @param { [name: string]: string } headers
 */
export const generateContext: ContextFunction<{ event: APIGatewayEvent }, IGraphQLContext> =
	async ({event: {headers}}) => ({
		auth: await getAuthContext(headers, {
			awsRegion: await getCognitoUserRegion(),
			userPoolId: await getCognitoUserPoolId()
		})
	});
