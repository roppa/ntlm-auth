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
  require('./server/cookie-validator'), //validate cookie (optional)
  require('./server/ntlm'), //use ntlm
  require('./server/ldap'), //expect res.ntlm TODO: use middelware to set res.user
  require('./server/jwt') //terminate 403 or 200 with jwt cookie
];

module.exports = middlewareConfig;
