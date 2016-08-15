'use strict';

require('dotenv-safe').load();

let server = require('../mocks/ldapServer');
const ldap = require('ldapjs');

let ldapEntities = {
  'cn=root,dc=example,dc=com,o=example': {
    dn: 'cn=root,dc=example,dc=com',
    objectclass: 'organizationalRole',
    cn: 'Manager'
  },
  'cn=Bob Johnson,dc=example,dc=com,o=example': {
    cn: 'Bob Johnson',
    dn: 'cn=root,dc=example,dc=com,o=example',
    sn: 'Johnson',
    objectClass: 'inetOrgPerson',
    userPassword: 'rubbishpassword'
  }
};

before(done => {
  server.start(1389, () => {

    let ldapClient = ldap.createClient({
      url: process.env.DIRECTORY_SYSTEM_AGENT
    });

    ldapClient.bind(process.env.LDAP_ADMIN, process.env.LDAP_SECRET, error => {

      if (error) {
        return console.log('Error binding to LDAP: ' + error.message);
      }

      //Bound to server, creating test accounts
      for (let i in ldapEntities) {
        ldapClient.add(i, ldapEntities[i], error => {
          if (error) {
            console.error(error);
          }
        });
      }

    });
    done();
  });
});

after(done => {
  server.stop(done);
});
