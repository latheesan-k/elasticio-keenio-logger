/**
 * Developed by Latheesan Kanesamoorthy
 * (C) 2017 latheesan_k@hotmail.com
 */

// Load keen-tracking library.
const KeenTracking = require('keen-tracking');

// Initialise keen.io client
const keenioClient = new KeenTracking({
    projectId: process.env.projectId,
    writeKey: process.env.writeKey
});

// Method to record error.
module.exports.recordError = function({ orgName, taskName, msgBody, errorMessage, stackTrace })
{
    // Finished
    return recordEvent('Elastic.IO Errors', {
        orgName: orgName || '-',
        taskName: taskName || '-',
        msgBody: msgBody || {},
        errorMessage: errorMessage || '-',
        stackTrace: stackTrace || '-'
    });
};

// Common method to record event.
function recordEvent(streamName, streamData)
{
    // Anticipate error
    try
    {
        // Append elastic.io meta data to stream data
        streamData.meta = {
            ELASTICIO_ORGANIZATION_ID: process.env.ELASTICIO_ORGANIZATION_ID || '-',
            ELASTICIO_API_USERNAME: process.env.ELASTICIO_API_USERNAME || '-',
            ELASTICIO_TASK_ID: process.env.ELASTICIO_TASK_ID || '-',
            ELASTICIO_EXEC_ID: process.env.ELASTICIO_EXEC_ID || '-',
            ELASTICIO_COMP_ID: process.env.ELASTICIO_COMP_ID || '-',
            ELASTICIO_FUNCTION: process.env.ELASTICIO_FUNCTION || '-',
            ELASTICIO_USER_ID: process.env.ELASTICIO_USER_ID || '-'
        };

        // Record the event
        let result = keenioClient.recordEvent(
            streamName,
            streamData
        );

        // Check if an error occurred
        if (result === undefined)
        {
            // Error
           return errorResponse(new Error('Failed to record event, check if projectId & writeKey ENV vars are set and is valid.'));
        }

        // Success
        return successResponse();
    }
    catch (exception)
    {
        // Handle error
        return errorResponse(exception);
    }
}

// Common method to generate success response.
function successResponse()
{
    // Finished
    return newResponse(true);
}

// Common method to generate error response.
function errorResponse(exception)
{
    // Finished
    return newResponse(false, true, exception);
}

// Common method to generate response object.
function newResponse(success, error, exception)
{
    // Workout states
    success = (success !== undefined && success === true);
    error = (error !== undefined && error === true);

    // Finished
    return {
        success: success,
        error:  error,
        message: (exception !== undefined && exception !== null && exception.hasOwnProperty('message') ? exception.message : (!success ? 'Unknown error occurred' : '-')),
        stacktrace: (exception !== undefined && exception !== null && exception.hasOwnProperty('stack') ? exception.stack.trim() : (!success ? 'Not available' : '-'))
    }
}
