#Authentication and Authorisation example

Still very much a work in progress. We want to create an authentication/authorisation service that can use NTLM or fall back on some other service.

The idea is to just have a series of middleware that is configurable and chained.

For example:

  1. Authenticate over NTLM (unfortunately)
  2. Get user details from AD
  3. Store users details from above in JWT
  4. Send 200
