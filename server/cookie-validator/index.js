'use strict';

function validateCookie (req, res, next) {
  if (req.cookies.auth) {
  //   //authenticate cookie here
  //   //if invalid cookie
  //     //res.clearCookie('auth');
  //     //next();
    return res.status(200).end();
  }

  next();
}

module.exports = validateCookie;
