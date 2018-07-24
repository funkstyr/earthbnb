### Structure

| Service    |                     Details                     |
| ---------- | :---------------------------------------------: |
| web        |                  React client                   |
| desktop    |                 Electron client                 |
| mobile     |          React Native for Android/iOS           |
| api        |      QraphQL endpoint for database access       |
| server     | Server to populate database with 3rd party info |
| common     |       Shared between servers and clients        |
| controller |      Shared between clients for api acess       |

### NPM

`--detectOpenHandles`: just to get rid of Jest error

- Researched and found it could be a create-react-app issue with react-scripts and Jest
- Need to look into running `/web` CRA and `/api` Jest in yarn workspaces

### Yarn

### Windows

`npm install -g win-node-env`

### Docker

For changing port docker image port:localhost port

- For local dev
  - postgres: `docker run -d -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres --name postgres --restart=always -p 5432:5432 postgres`
  - redis: `docker run -d --name redis --restart=always -p 6379: 6379 redis`
