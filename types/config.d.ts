declare interface ICognitoConfiguration {

	awsRegion: string;
	clientId: string;
	userPoolId: string;

}

declare interface IConfig {

	awsRegion: string;
	cognito: ICognitoConfiguration;

}

declare let config: IConfig;
