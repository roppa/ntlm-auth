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
    SECRET='|9u;H3BX.ntr|T;2WvYf;I%9DW_toW_&6Y i *)S}W}7ZG1UqV-,^tC&36|@gv9<)]JmH/@SW.JyE-HB-yU(#9pYtT32_Ni,>rFf9;9jvF$@{Ce%n^TLuN-ZANusD4Y|w);@kP93igW=QnTeSKt-V-J9rJa=$-<Hu-.!Db^`Nbpqc2C*_G^vr N?4W|NCvX]_dS'
    DOMAIN_NAME='TESTDOMAIN'
    DIRECTORY_SYSTEM_AGENT='ldap://0.0.0.0:1389'
    #LDAP
    LDAP_ADMIN='cn=root'
    LDAP_SECRET='secret'
```

If the app is running then it needs access to an ldap server. To spin one up for testing:


  1. run node
  2. run ```let server = require('./mocks/ldapServer');```
  3. run ```server.start(1389, () => {});```

##Testing

Run ```mocha```. This spins up a dev LDAP server.
