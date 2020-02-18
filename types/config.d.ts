declare type CognitoConfiguration = {

	awsRegion: string;
	clientId: string;
	userPoolId: string;

};

declare type Configuration = {

	awsRegion: string;
	cognito: CognitoConfiguration;

};
