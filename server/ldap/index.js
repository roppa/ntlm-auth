'use strict';

let ldap = require('ldapjs');

/**
 * Connects to LDAP server and runs a callback function as the middleware handler
 * @param {function} callback function, must be in middleware format
 */

let ldapMiddleware = (function () {

  let ldapClient = ldap.createClient({
    url: process.env.DIRECTORY_SYSTEM_AGENT
  });

  ldapClient.bind(process.env.LDAP_ADMIN, process.env.LDAP_SECRET, error => {
    if (error) {
      console.log(error);
    }
  });

  return (req, res, next) => {

    if (!req.ntlm || !req.ntlm.UserName) {
      return res.status(403).end();
    }

    let user = {
      username: req.ntlm.UserName
    };

    //set attribute on request for next middleware
    req.user = user;

    //get user credentials
    //`(&(${process.env.LDAP_ACCOUNT_NAME}=${user.username})(memberOf=${process.env.LDAP_ACCESS_GROUP}))`;

    next();

  };

}());

module.exports = ldapMiddleware;
