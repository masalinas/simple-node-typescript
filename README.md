# description
A Simple typescript node project using rxjs library

# steps
step 01: create working folder
mkdir simple-node-typescript

cd simple-node-typescript

step 02: initialize node project
npm init

we could remove main attribute in your package.json

step 03: install dependencies
npm install typescript --save
npm install rxjs --save

step04: create source a destination folders in your project
mkdir src
mkdir dist

step05: add npm start script in your package.json to compile and start your project
"start": "npx tsc && node dist/main.js",
