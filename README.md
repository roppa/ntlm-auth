#Authentication and Authorisation example

Still very much a work in progress. We want to create an authentication/authorisation service that can use NTLM or fall back on some other service.

The idea is to just have a series of middleware that is configurable and chained.

For example:

  1. Authenticate over NTLM (unfortunately)
  2. Get user details from AD
  3. Store users details from above in JWT
  4. Send 200

##Setup

The app uses dotenv-safe for development. Create a .env file at the root of the application and add the following:

```
PORT=8070
SECRET='TOTALLYAWESOMESECRET'
DOMAIN_NAME='TESTDOMAIN'
DIRECTORY_SYSTEM_AGENT='ldap://0.0.0.0:1389'
#LDAP
LDAP_ADMIN='cn=root'
LDAP_SECRET='secret'
LDAP_ACCOUNT_NAME='testorg'
LDAP_ACCESS_GROUP='dc=example,dc=com,o=example'
```

If the app is running then it needs access to an ldap server. To spin one up for testing:

  1. run node
  2. run ```let server = require('./mocks/ldapServer');```
  3. run ```server.start(1389, () => {});```

##Testing

Run ```mocha```. This spins up a dev LDAP server.
