# NodeJS Mandatory_2

#### Install all dependencies from root directory by running:
```
npm install
```

#### Setup config files in `/config` directory:
For both files remove "template" so they stay as [filename].[extension]
- set session secret in `config.json`
- set db credentials in `mysqlCredentials.js`

#### Create tables and fill them with data by running:
```
npm run db:reset
```

#### When completed, you can run the app by:
```
npm start
```

#### Visit page at `localhost:3000`
Create a new account or login with test user:
- username: `test`
- password: `test`