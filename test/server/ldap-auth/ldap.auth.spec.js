'use strict';

require('dotenv-safe').load();

let express = require('express');
let request = require('supertest');
let expect = require('chai').expect;
let middlewareDecorator = require('../../../server/middleware');
let ldapMiddleware = require('../../../server/ldap');

let app;

describe('LDAP middleware', () => {

  beforeEach(() => {
    app = express();
  });

  describe('LDAP authentication with username and password', () => {

    it('should return 401 for incorrect username or password', done => {

      middlewareDecorator(app, [(req, res, next) => {
        req.ntlm = {
          Userame: 'Paul Thompson'
        };
        next();
      }, ldapMiddleware, (req, res, next) => {
        res.cookie('ldaptest', req.user);
        res.end();
      }]);

      request(app)
        .post('/login')
        .field('username', 'Peter Bobbety')
        .expect(403)
        .end((error, res) => {
          if (error) {
            throw error;
          }
          done();
        });
    });

  });

});
