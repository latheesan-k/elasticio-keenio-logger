/**
 * Don't forget to set the following node.js env vars:
 *
 * process.env.projectId (keen.io project id)
 * process.env.writeKey (keen.io write key)
 */

// Load the library.
const logger = require('../src/logger');

// Test record error function.
let result = logger.recordError({
    orgName: 'Test org',
    taskName: 'Test task',
    msgBody: { test: 'data' },
    errorMessage: 'Test error',
    stackTrace: 'Test stack'
});
console.log('recordError result', result);
