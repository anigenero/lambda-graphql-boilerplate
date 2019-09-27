let _config: IConfig = null;

const _parseConfig = async (): Promise<IConfig> => ({
	awsRegion: process.env.aws_region,
	cognito: {
		awsRegion: process.env.aws_region,
		clientId: process.env.cognito_client_id,
		userPoolId: process.env.cognito_user_pool_id
	}
});

const _getConfiguration = async (): Promise<IConfig> => {

	if (_config) {
		return _config;
	} else {
		_config = await _parseConfig();
		return _config;
	}

};

export const getAwsRegion = async () => (await _getConfiguration()).awsRegion;

export const getCognitoUserRegion = async () => (await _getConfiguration()).cognito.awsRegion;

export const getCognitoUserPoolId = async () => (await _getConfiguration()).cognito.userPoolId;
