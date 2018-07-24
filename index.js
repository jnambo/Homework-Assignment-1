/*
 * Homework Assignment #1 (Welcome message API)
 *
 */

// Dependencies
const config = require('./config');
const handlers = require('./handlers');
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// START the HTTP or HTTPS server depending on the config options
if (config.envName == 'develop') {
  http.createServer(serverRequestHandler).listen(config.port, serverStartup);
} else if (config.envName == 'production') {
  https.createServer(config.serverOptions, serverRequestHandler).listen(config.port, serverStartup);
}

// Callback function called when the server (HTTP or HTTPS) is started
function serverStartup() {
  console.log(config.envName + ' environment is up and running on port: ' + config.port);
}

function serverRequestHandler(req, res) {

  // Extract all data sent by the client and pass it as a parameter to the callback function
  getRequestData(req, function (requestData) {
    // Get the handler this request should go to.
    const requiredHandler = getTheRequiredHandler(req);

    // Route the request to the required handler
    requiredHandler(requestData, function (statusCode, responseData) {

      // Use the status code given by the handler, or the default 200 otherwise
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      // Use the response data given by the handler, or an empty object otherwise
      responseData = typeof(responseData) === 'object' ? responseData : {};

      // Return the response back to the client
      res.setHeader('Content-type', 'application/json');
      res.writeHead(statusCode);
      res.end(JSON.stringify(responseData));

      console.log('------ This was the processed data: ------');
      console.log(requestData);
      console.log('----------------------------------------');
    });
  });
}

function getTheRequiredHandler(req) {
  // Get the HTTP Method
  const method = req.method.toLowerCase();
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);
  // Get the path
  const requestedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

  // Get all the handlers for the required method, if there are not handlers for that method then use the notSupportedMethod handler
  if (typeof(handlers[method]) === 'object') {
    const handlersForRequiredMethod = handlers[method];

    // Get the handler for the requested path, if no one is found then use the notFound handler
    return (handlersForRequiredMethod[requestedPath]) ? handlersForRequiredMethod[requestedPath] : handlers.badRequest.notFound;
  } else {
    return handlers.badRequest.notSupportedMethod;
  }
}


function getRequestData(req, callback) {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path, this will be part of the request data
  const requestedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

  // Get query string as an object, this will be part of the request data
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method, this will be part of the request part
  const method = req.method.toLowerCase();

  // Get the payload, if any, this will be part of the request data
  const decoder = new StringDecoder('utf-8');
  let payload = '';

  req.on('data', function (data) {
    payload += decoder.write(data);
  });

  req.on('end', function () {
    payload += decoder.end();

    const requestData = {
      'requestedPath': requestedPath,
      'method': method,
      'queryStringObject': queryStringObject,
      'payload': payload
    };

    callback(requestData);
  });
}

