'use strict';

const ntlm = require('express-ntlm');

/**
 * Sets ntlm object onto response object
 */
let ntlmMiddleware = ntlm({
  // debug: () => {
  //   console.log(Array.prototype.slice.call(arguments)[0]);
  // },
  domain: process.env.DOMAIN_NAME,
  domaincontroller: process.env.DIRECTORY_SYSTEM_AGENT
});

module.exports = ntlmMiddleware;
