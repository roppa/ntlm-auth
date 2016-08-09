'use strict';

let jwt = require('jwt-simple');

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
  require('./server/ldap')(ldapCallback),
  require('./server/jwt')(jwtCallback) //
];

function validateCookie (req, res, next) {
  if (req.cookies.auth) {
    //authenticate cookie here
    //if invalid cookie
      //res.clearCookie('auth');
      //next();
    return res.status(200).end();
  }

  next();
}

function ldapCallback (req, res, next) {

  if (!req.ntlm || !req.ntlm.UserName) {
    return res.status(401).end();
  }

  let user = {
    username: req.ntlm.UserName
  };

  //set attribute on request for next middleware
  req.user = user;

  next();

}

function jwtCallback (req, res, next) {

  if (req.user) {
    res.cookie('auth', jwt.encode(req.user, process.env.SECRET), { httpOnly: true });
    return res.status(200).end();
  }

  //must not be authorised
  return res.status(401).end();

}

module.exports = middlewareConfig;
