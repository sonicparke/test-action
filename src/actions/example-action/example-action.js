const axios = require('axios');

/**
 * This example action will make a request to the VirusTotal API.
 * Reference: https://developers.virustotal.com/reference#url-report
 */
exports.handler = (async (input, context) => {
  try {
    // Retrieve the input parameter data from the input
    const { apiKey, query } = input;

    // Let's make a request using 'axios' HTTP package to the VirusTotal API.
    // Learn more about: https://www.npmjs.com/package/axios
    const request = await axios.get('https://www.virustotal.com/vtapi/v2/file/search?apikey=' + apiKey + '&query=' + query);

    // Once we get the response, let's look pull out the data property
    // Rference: https://www.npmjs.com/package/axios#response-schema
    const data = request.data;

    // Next let's create an output envelope that includes a few
    // properties from the VirusTotal API. At this point, we could just
    // return the 'request.data' or we could construct our own response.
    // In this example, we will just return the total and positives.
    // We are also returning success because of the error handling approach we have chosen to take.
    const output = {
      success: true,
      data: {
        positives: data.positives,
        total: data.total
      }
    };

    // If we want to log some information for debugging/etc later
    // we can use the console.log() command and pass it a object
    console.log('VirusTotal returned', data);

    // Let's return the output data
    return output;
  } catch (err) {
    // If there was an error with the request, we can return an
    //   error response envelope here to allow for the caller to inspect the result.
    // Alternatively we could let the error propogate through and then the action would
    //   be subject to the error handling logic of the caller.
    return {
      success: false,
      errors: []
    };
  }
});