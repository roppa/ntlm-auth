'use strict';

/**
 * Configure the way the app/middleware works in order.
 * For our app we want to:
 * 1. Authenticate over NTLM (unfortunately)
 * 2. Get user details from AD
 * 3. Store users details from above in JWT
 * @returns {array} to be iterated over in middleware
 */
let middlewareConfig = [
  require('./server/cookie-validator'),
  require('./server/ntlm'),
  require('./server/ldap'),
  require('./server/jwt')
];

module.exports = middlewareConfig;
