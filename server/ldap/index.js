'use strict';

let ldap = require('ldapjs');

/**
 * Connects to LDAP server and runs a callback function as the middleware handler
 * @param {function} callback function, must be in middleware format
 */

let ldapMiddleware = (req, res, next) => {

  let client = ldap.createClient({
    url: process.env.DIRECTORY_SYSTEM_AGENT
  });

  client.bind(process.env.LDAP_ADMIN, process.env.LDAP_SECRET, error => {
    if (error) {
      console.log(error);
      res.status(500).end();
    }
  });

  if (!req.ntlm || !req.ntlm.UserName) {
    return res.status(403).end();
  }

  let opts = {
    //filter: '(&(cn=Bob Johnson)(userPassword=rubbishpassword))',
    filter: '(cn=' + req.ntlm.UserName + ')',
    scope: 'sub'
  };

  let dn = 'cn=' + req.ntlm.UserName + ',' + process.env.LDAP_ACCESS_GROUP;

  client.search(dn, opts, (error, result) => {

    if (error) {
      return res.status(500).end();
    }

    result.on('searchEntry', entry => {
      //set attribute on request for next middleware
      req.user = {};
      req.user.username = req.ntlm.UserName;
      req.user.password = entry.object.userPassword;
    });

    result.on('error', error => {
      res.status(500).end();
    });

    result.on('end', (result) => {
      next();
    });

  });

};

module.exports = ldapMiddleware;
