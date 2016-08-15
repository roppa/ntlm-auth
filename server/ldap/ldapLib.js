'use strict';

let ldap = require('ldapjs');

//binds client
//sets options - either user or username and password combo
//builds cn
//searches client, populating req object

/**
 * getClient - instantiate an instance of ldapjs
 * @param {string} url of the directory system agent
 */
let getClient = (url) => {
  if (typeof url !== 'string') {
    throw new Error('getClient needs the url of the directory system agent');
  }

  return ldap.createClient({
    url: url
  });
};

/**
 * bindClient - takes client and binds to user and secret
 * @param client {ldap object}
 * @param username {string}
 * @param secret {string}
 * @param callback {function}
 */
let bindClient = (client, username, secret, callback) => {
  return client.bind(username, secret, callback);
};

/**
 * search performs a search on active directory
 * @param client {ldapjs instance}
 * @param dn {string} active directory distinguished name
 * @param opts {object} contains filter and scope attributes
 * @returns {promise} resolves with valid user or rejects
 */
let search = (client, dn, opts) => {

  return new Promise((resolve, reject) => {

    if (!client || typeof client.search === 'undefined') {
      reject('Invalid client object');
    }

    client.search(dn, opts, (error, result) => {

      if (error) {
        return reject(error);
      }

      let user = null;

      result.on('searchEntry', entry => {
        user = {};
        user.username = entry.object.UserName;
        user.password = entry.object.userPassword;
      });

      result.on('searchReference', referral => {
        console.log('referral: ' + referral.uris.join());
      });

      result.on('error', error => {
        reject(error);
      });

      result.on('end', result => {
        resolve(user);
      });

    });

  });

};

let lib = {
  getClient: getClient,
  bindClient: bindClient,
  search: search
};

module.exports = lib;
