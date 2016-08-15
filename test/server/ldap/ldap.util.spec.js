'use strict';

require('dotenv-safe').load();

let ldapUtils = require('../../../server/ldap/ldapLib');
let expect = require('chai').expect;

describe('LDAP Utils', () => {

  describe('getClient method', () => {

    it('should throw when no url', () => {
      expect(() => {
        ldapUtils.getClient();
      }).to.throw();
    });

    it('should return an instance of ldap', () => {
      let instance = ldapUtils.getClient(process.env.DIRECTORY_SYSTEM_AGENT);
      expect(instance).to.be.an('object');
    });

  });

  describe('bindClient method', () => {

    it('should throw with invalid client', () => {

      expect(() => {
        ldapUtils.bind();
      }).to.throw();

      expect(() => {
        ldapUtils.bind({});
      }).to.throw();

    });

    it('should bind', done => {
      let instance = ldapUtils.getClient(process.env.DIRECTORY_SYSTEM_AGENT);
      ldapUtils.bindClient(instance,
        process.env.LDAP_ADMIN,
        process.env.LDAP_SECRET,
        error => {
          expect(error).to.eql(null);
          done();
        }
      );

    });

  });

  describe('search method', () => {

    it('should throw with invalid client', done => {

      ldapUtils
        .search()
        .then(value => {
          throw new Error();
        })
        .catch(error => {
          expect(error).to.be.eql('Invalid client object');
          done();
        });

    });

    it('should throw with invalid options', () => {

      let instance = ldapUtils.getClient(process.env.DIRECTORY_SYSTEM_AGENT);
      ldapUtils.bindClient(instance,
        process.env.LDAP_ADMIN,
        process.env.LDAP_SECRET,
        error => {
          expect(error).to.eql(null);
          done();
        }
      );

      ldapUtils
        .search(instance)
        .then(value => {
          console.log('its worked');
          throw new Error();
        })
        .catch(error => {
          expect(error).to.be.eql('Invalid client object');
          done();
        });

    });

  });

});
