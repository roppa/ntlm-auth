'use strict';

let jwt = require('jwt-simple');

let validateCookie = (req, res, next) => {

  if (req.cookies.auth) {

    jwt.verify(req.cookies.auth, process.env.SECRET, function (error, decoded) {
      if (error) {
        return res.status(403).end();
      }
      //do something with cookie here
      return res.status(200).end();
    });

  }

  next();
};

module.exports = validateCookie;
