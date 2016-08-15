'use strict';

let jwt = require('jwt-simple');

let validateCookie = (req, res, next) => {

  if (req.cookies.auth) {
    let decoded = jwt.decode(req.cookies.auth, process.env.SECRET);
    //do something here with decoded
  }

  next();
};

module.exports = validateCookie;
