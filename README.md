# Homework-Assignment-1
## To run in develop mode 

```
node index.js 
```
or
```
NODE_ENV=develop node index.js
```

## To run in production mode
```
NODE_ENV=production node index.js
```

# This project consists of 3 main files, they are:
## config.js
This file will catch the `NODE_ENV` param value and will return a configuration object which contains the needed information
to start the web server, like:

* port
* envName
* serverOptions

this config object will be used later for the `index.js` file to startup the web server

## index.js
This file will startup the web server based on the `NODE_ENV` param value:

* For _**develop**_ environment will start an HTTP server, listening on port _**8080**_
* For _**production**_ environment will start an HTTPS server, listening on port _**8443**_

This file also has the functionality needed to process all the request by including a router based on the lectures given
by this course but in this case the handlers that will attend the request are grouped by HTTP method and the path request. 
for example:

```
handlers = {
  post: {
    // all handlers that will attend the post request goes here
  },
  get: {
    // all handlers that will attend the get request goes here
  }
  ...
  badRequest: {
    // a special handler group which purpose is to group all handlers for those request that we cannot 
    // attend normally, for example, a requested path that is not found or an unsupported HTTP method
  }
}
```

## handlers.js
This file contains all the logic for the handlers, if we need to add a new **path|handler** this is the file you should 
modify











