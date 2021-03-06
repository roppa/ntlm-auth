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

    it('should return 403 for no credentials', done => {

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

    it('should return 403 for invalid credentials', done => {

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

    it('should return 200 for valid credentials', done => {

      middlewareDecorator(app, [(req, res, next) => {
        req.ntlm = {
          UserName: 'Bob Johnson'
        };
        next();
      }, ldapMiddleware, (req, res, next) => {
        res.cookie('ldaptest', req.user);
        res.end();
      }]);

      request(app)
        .get('/')
        .expect(200)
        .end((error, res) => {
          if (error) {
            throw error;
          }
          let rawCookieString = decodeURIComponent(res.headers['set-cookie'][0]);
          let cookieObject = JSON.parse(rawCookieString.substring(
            rawCookieString.indexOf('{'),
            rawCookieString.lastIndexOf('}') + 1));
          expect(cookieObject.username).to.eql('Bob Johnson');
          done();
        });

    });
  });

});
