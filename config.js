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
  validateCookie,
  //require('./server/ntlm'), //attaches an object to req
  require('./server/ldap'),
  require('./server/jwt')
];

function validateCookie (req, res, next) {
  if (req.cookies.auth) {
  //   //authenticate cookie here
  //   //if invalid cookie
  //     //res.clearCookie('auth');
  //     //next();
    return res.status(200).end();
  }

  next();
}

module.exports = middlewareConfig;
