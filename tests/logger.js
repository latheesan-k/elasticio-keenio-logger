/**
 * Don't forget to set the following node.js env vars:
 *
 * process.env.projectId (keen.io project id)
 * process.env.writeKey (keen.io write key)
 * process.env.ELASTICIO_ORGANIZATION_NAME (name of the elastic.io organisation)
 */

// Load the library.
const logger = require('../src/logger');

// Test record error function.
let result = logger.recordError({
    taskName: 'Test task',
    errorMessage: 'Test error',
    stackTrace: 'Test stack'
});
console.log('recordError result', result);
