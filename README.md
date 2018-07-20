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

- Reaserched and found it could be a create-react-app issue with react-scripts and Jest
- Need to look into running CRA and /api Jest together

### Yarn

### Windows

`npm install -g win-node-env`

### Docker

``
