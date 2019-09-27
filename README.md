# lambda-graphql-boilerplate
This boilerplate uses AWS Lambda through API Gateway to provide a GraphQL service. 

_Note: this library uses DynamoDB as its data store to reduce complexity in setup (as opposed to an RDBMS). In a real-world 
situation, [AWS AppSync](https://aws.amazon.com/appsync/) \*might\* be the better choice when accessing data from this NoSQL store._

## Requirements

- AWS CLI
- AWS SAM CLI ([installation instructions](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html))
- NodeJS 10 or higher

## Installation

```bash
> ./setup.sh
```

To publish the CodePipeline to your AWS organization, execute the `aws.sh` script from your terminal console. Follow the prompts from the script. 

```bash
> ./aws.sh
```
