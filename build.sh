#!/usr/bin/env bash

npm run generate:graphql || { echo 'ERROR'; exit 1; }
npm run lint || { echo 'ERROR'; exit 1; }
#npm test -- --coverage || { echo 'ERROR'; exit 1; }

npm run build || { echo 'ERROR'; exit 1; }

cp ./package.json ./dist/
cp ./package-lock.json ./dist/

npm install --production --prefix ./dist || { echo 'ERROR'; exit 1; }

read -r -p "What is the S3 bucket" s3_bucket
if [[ -z "${s3_bucket}" ]]
then
  echo "S3 bucket is required"
  exit 1
fi

sam build --template graphql.sam.yml
sam package --s3-bucket "${s3_bucket}" --output-template-file package.yml
