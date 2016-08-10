'use strict';

let server = require('../mocks/ldapServer');

before(done => {
  server.start(1389, done);
});

after(done => {
  server.stop(done);
});
