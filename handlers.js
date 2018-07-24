/*
 * Handlers to attend all web server request
 * 
 */

// Handlers are classified by HTTP method that should attend, there is a special classification for those bad request which cannot be attended
const handlers = {
  'post': {},
  'badRequest': {}
};

// hello handler
handlers.post.hello = function (data, callback) {
  callback(200, {'message': 'Welcome to the Homework Assignment #1'});
}

handlers.badRequest.notSupportedMethod = function(data, callback) {
  callback(405, {'message': 'Method Not Allowed'})
}

handlers.badRequest.notFound = function(data, callback) {
  callback(404, {'message': 'Not Found'});
}

module.exports = handlers;