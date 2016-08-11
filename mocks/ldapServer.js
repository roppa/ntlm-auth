'use strict';

let ldap = require('ldapjs');
let server = ldap.createServer();

server.bind('cn=root', (req, res, next) => {
  if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret') {
    return next(new ldap.InvalidCredentialsError());
  }
  res.end();
  return next();
});

server.search('o=test', (req, res, next) => {
  let obj = {
    dn: req.dn.toString(),
    attributes: {
      objectclass: ['organization', 'top'],
      o: 'test'
    }
  };

  if (req.filter.matches(obj.attributes)) {
    res.send(obj);
  }

  res.end();
});

server.start = (port, done) => {
  port = port || 1389;
  server.listen(port, () => {
    console.log(`LDAP server listening at ${server.url}`);
    done();
  });
};

server.stop = done => {
  server.emit('close');
  console.log(`LDAP server at ${server.url} now closed`);
  done();
};

module.exports = server;
