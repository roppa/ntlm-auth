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
  domaincontroller: process.env.DOMAIN_CONTROLLER
});

module.exports = ntlmMiddleware;
