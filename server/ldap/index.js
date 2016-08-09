'use strict';

let ldap = require('ldapjs');

/**
 * Connects to LDAP server and runs a callback function as the middleware handler
 * @param {function} callback function, must be in middleware format
 */
let ldapMiddleware = callback => {

  let ldapClient = ldap.createClient({
    url: process.env.DOMAIN_CONTROLLER
  });

  return callback;

};

module.exports = ldapMiddleware;
