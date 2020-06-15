type CognitoConfiguration = {

	awsRegion: string;
	clientId: string;
	userPoolId: string;

};

type Configuration = {

	awsRegion: string;
	cognito: CognitoConfiguration;

};


let _config: Configuration = null;

const _parseConfig = (): Configuration => ({
	awsRegion: process.env.aws_region,
	cognito: {
		awsRegion: process.env.aws_region,
		clientId: process.env.cognito_client_id,
		userPoolId: process.env.cognito_user_pool_id
	}
});

const _getConfiguration = (): Configuration => {

	if (_config) {
		return _config;
	} else {
		_config = _parseConfig();
		return _config;
	}

};

export const getAwsRegion = () => (_getConfiguration()).awsRegion;

export const getCognitoUserRegion = () => (_getConfiguration()).cognito.awsRegion;

export const getCognitoUserPoolId = () => (_getConfiguration()).cognito.userPoolId;
