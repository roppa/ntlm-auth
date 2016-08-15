'use strict';

//username and password authentication
let ldapAuth = app => {

  app.post('/login', (req, res) => {

    let userData = req.body;

    if (!userData.username || !userData.password) {
      return res.status(401).end();
    }

  });

};

module.exports = ldapAuth;
