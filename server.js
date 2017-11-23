/**
 * Create valid domain names
 * @param {Any[]} availableDomains
 * @param {String} userInput
 * @returns {Object[]}
 */
function createDomainName(availableDomains, userInput) {
  return availableDomains.map((avalaibleDomain) => {
    const domainName = avalaibleDomain.domainName;

    if (userInput.indexOf(domainName) !== 0) {
      return Object.assign(
        {
          result: userInput.replace(new RegExp(domainName), `.${domainName}/`),
        },
        avalaibleDomain
      );
    } else {
      // Complete with xxx if string starts with valid domain extension
      const regex = `.*(${domainName}?).*`;
      return Object.assign(
        {
          result: userInput.replace(new RegExp(regex), `xxx.${domainName}/`),
        },
        avalaibleDomain
      );
    }
  });

}

/**
 * Getting list of avalaible domains
 * @param {String} userInput
 * @returns {Object[]}
 */
function extractMatches(userInput) {
  const domains = require('./src/assets/domains.json');
  return Object.keys(domains)
    .filter((domainName) => userInput.indexOf(domainName) !== -1)
    .map((domainName) => {
      const sponsor = domains[domainName].sponsor;
      return {
        domainName,
        sponsor
      };
    });
}

const express = require('express')
const cors = require('cors')
const app = express()

const whitelist = ['http://localhost:4200'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
}

// Preflight fix
app.use((req, res, next) => {
  let oneof = false;
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }
  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/:userInput', cors(corsOptionsDelegate), (req, res, next) => {
  const userInput = req.params.userInput;
  if (!userInput) {
    res.json('[]');
  }
  const domains = extractMatches(userInput);
  const domainNames = createDomainName(domains, userInput);
  res.json(domainNames);
})

app.listen(8000, () => {
  console.log('CORS-enabled web server listening on port 8000')
})