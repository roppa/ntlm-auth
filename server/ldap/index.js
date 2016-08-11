'use strict';

let ldap = require('ldapjs');

/**
 * Connects to LDAP server and runs a callback function as the middleware handler
 * @param {function} callback function, must be in middleware format
 */

let ldapMiddleware = (function () {

  let ldapClient = ldap.createClient({
    url: process.env.DOMAIN_CONTROLLER
  });

  ldapClient.bind(process.env.LDAP_ADMIN, process.env.LDAP_SECRET, error => {
    console.log(error);
  });

  return (req, res, next) => {

    res.header('test', 'test');

    if (!req.ntlm || !req.ntlm.UserName) {
      return res.status(403).end();
    }

    let user = {
      username: req.ntlm.UserName
    };

    //set attribute on request for next middleware
    req.user = user;

    next();

  };

}());

module.exports = ldapMiddleware;
