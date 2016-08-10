'use strict';

process.env.PORT = 8070;
process.env.SECRET = '|9u;H3BX.ntr|T;2WvYf;I%9DW_toW_&6Y i *)S}W}7ZG1UqV-,^tC&36|@gv9<)]JmH/@SW.JyE-HB-yU(#9pYtT32_Ni,>rFf9;9jvF$@{Ce%n^TLuN-ZANusD4Y|w);@kP93igW=QnTeSKt-V-J9rJa=$-<Hu-.!Db^`Nbpqc2C*_G^vr N?4W|NCvX]_dS';
process.env.DOMAIN_NAME = 'TESTDOMAIN';
process.env.DOMAIN_CONTROLLER = 'ldap://0.0.0.0:1389';

var express = require('express');
let request = require('supertest');
let expect = require('chai').expect;
let middlewareDecorator = require('../../../server/middleware');
let ldapMiddleware = require('../../../server/ldap');

let app;

describe('LDAP middleware', () => {

  beforeEach(() => {
    app = express();
  });

  describe('invalid credentials', () => {

    it('should return 403 for invalid cretentials', done => {

      middlewareDecorator(app, [ldapMiddleware]);

      request(app)
        .get('/')
        .expect(403)
        .end((error, res) => {
          if (error) {
            throw error;
          }
          done();
        });

    });

  });

  describe('valid credentials', () => {

    it('should return 200 for valid cretentials', done => {

      middlewareDecorator(app, [(req, res, next) => {
        req.ntlm = {
          UserName: 'bob'
        };
        next();
      }, ldapMiddleware, (req, res, next) => {
        res.end();
      }]);

      request(app)
        .get('/')
        .expect(200)
        .end((error, res) => {
          if (error) {
            throw error;
          }
          done();
        });

    });
  });

});
