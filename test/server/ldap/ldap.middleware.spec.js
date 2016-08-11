'use strict';

require('dotenv-safe').load();

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
