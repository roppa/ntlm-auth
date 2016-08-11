'use strict';

var express = require('express');
let request = require('supertest');
let expect = require('chai').expect;
let jwt = require('jwt-simple');
let middlewareDecorator = require('../../../server/middleware');
let jwtMiddleware = require('../../../server/jwt');

let app;

describe('JWT middleware', () => {

  beforeEach(() => {
    app = express();
  });

  describe('invalid credentials', () => {

    it('should return 403 for invalid credentials', done => {

      middlewareDecorator(app, [jwtMiddleware, (req, res, next) => {
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

    it('should return 200 for valid credentials', done => {

      middlewareDecorator(app, [(req, res, next) => {
        req.user = {
          username: 'bob'
        };
        next();
      }, jwtMiddleware, (req, res, next) => {
        res.end();
      }]);

      request(app)
        .get('/')
        .expect(200)
        .end((error, res) => {
          if (error) {
            throw error;
          }
          let rawCookieString = res.headers['set-cookie'][0];
          let token = rawCookieString.substring(
            rawCookieString.indexOf('=') + 1,
            rawCookieString.indexOf(';'));
          let decoded = jwt.decode(token, process.env.SECRET);

          expect(decoded.username).to.eql('bob');
          done();
        });

    });

  });

});
