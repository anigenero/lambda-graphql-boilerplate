#!/bin/bash

cd `dirname $0`

for filename in $(find . -name '*.yml'); do

    echo "Validate ${filename}..."

    errormessage=$(/sbin/modprobe -n -v hfsplus 2>&1)
    error=`aws cloudformation validate-template --template-body file://${filename} 2>&1 | grep error`

    if [[ -n ${error} ]]; then
      echo ${filename} - ${error}
      exit 1
    fi

done

read -p 'What is the sender email? ' sender_email
if [[ -z "${sender_email}" ]]
then
    echo 'Sender email is required'
    exit 1
fi

read -p 'Pick a S3 build bucket name (must be canonical): ' s3_bucket
if [[ -z "${s3_bucket}" ]]
then
    echo 'Build bucket name is required'
    exit 1
fi

read -p 'What is your GitHub access token secret? ' github_token_secret
if [[ -z "${github_token_secret}" ]]
then
    echo 'GitHub access token required'
    exit 1
fi

git_branch=$(git branch | grep \* | cut -d ' ' -f2)
stack_suffix=$(echo "${git_branch}" | tr '[:upper:]' '[:lower:]')

echo "Deploying the pipeline CloudFormation stack..."

aws cloudformation deploy \
--template-file ./cfn/pipeline.yml \
--capabilities CAPABILITY_NAMED_IAM \
--stack-name task-api-${stack_suffix}-pipeline \
--parameter-overrides \
BuildBucketName=${s3_bucket} \
GitBranch=${git_branch} \
GitHubTokenSecret=${github_token_secret} \
SenderEmail=${sender_email} \
StackSuffix=${stack_suffix}
