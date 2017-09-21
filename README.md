# elasticio-keenio-logger
Simple helper library for recording errors and transactions in elastic.io to keen.io

### Installation

> npm install --save latheesan-k/elasticio-keenio-logger

### Usage

1. Setup your node.js env variables: `projectId` and `writeKey`
2. Load the library like this: `let logger = require('elasticio-keenio-logger');`

### Record Error

```js
let recordErrorResult = logger.recordError({
    orgName: 'Organisation Name',
    msgBody: { test: 'data' },
    taskName: 'Sync Order',
    errorMessage: 'Error message here',
    stackTrace: 'Stack trace here'
});
console.log('recordErrorResult', recordErrorResult);
```

### Record Transaction

> Coming soon~