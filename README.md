# description
A Simple typescript node project using rxjs library from scrach

# steps
**step 01**: create working folder
```
mkdir simple-node-typescript

cd simple-node-typescript
```

**step 02**: initialize node project
```
npm init
```

We could remove main attribute in your package.json

**step 03**: install dependencies
```
npm install typescript --save
npm install rxjs --save
```

**step 04**: create typescript configuration file
```
npx tsc --init
```

This commnad generate a tsconfig.json default file
Now we must:
   - Uncommnet the attribute moduleResolution
   - Update the attribute outDir and set ./dist value

**step 05**: create default source folder
```
mkdir src
```

**step 06**: add npm start script in your package.json to compile and start your project
```
"build": "npx tsc"   
"start": "npx tsc && node dist/main.js"   
```
