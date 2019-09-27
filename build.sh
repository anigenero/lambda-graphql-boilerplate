#!/usr/bin/env bash

npm run generate:graphql || { echo 'ERROR'; exit 1; }
npm run lint || { echo 'ERROR'; exit 1; }
#npm test -- --coverage || { echo 'ERROR'; exit 1; }

npm run build || { echo 'ERROR'; exit 1; }

cp ./package.json ./dist/
cp ./package-lock.json ./dist/

npm install --production --prefix ./dist || { echo 'ERROR'; exit 1; }
