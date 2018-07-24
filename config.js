/**
 * Configurations to initialize the web server
 *
 */

// Dependencies
const fs = require('fs');

// Environments configs
const environments = {
  develop: {
    'port': 8080,
    'envName': 'develop'
  },
  production: {
    'port': 8443,
    'envName': 'production',
    'serverOptions': {
      'key': fs.readFileSync('./https/key.pem'),
      'cert': fs.readFileSync('./https/cert.pem')
    }
  }
};

// Get the desired environment
const chosenEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : '';
const chosenEnvironmentObject = typeof(environments[chosenEnvironment]) === 'object' ? environments[chosenEnvironment] : environments.develop;

// export server configs
module.exports = chosenEnvironmentObject;
