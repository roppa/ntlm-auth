'use strict';

let jwt = require('jwt-simple');

let jwtMiddleware = (req, res, next) => {

  if (req.user) {
    res.cookie('auth', jwt.encode(req.user, process.env.SECRET), { httpOnly: true });
    return res.status(200).end();
  }

  //must not be authorised
  return res.status(403).end();

};

module.exports = jwtMiddleware;
