'use strict';

const bodyParser = require('body-parser');

let middleware = (app, middlewareConfig) => {

  app.use(require('cookie-parser')());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (Array.isArray(middlewareConfig) && middlewareConfig.length > 0) {
    middlewareConfig
      .forEach(item => {
        app.use(item);
      });
  }

  //fallthrough catcher, will be a 500
  app.use(errorHandler);
  function errorHandler(error, req, res, next) {
    if (res.headersSent) {
      return next(error);
    }
    res.status(500);
    console.error(error);
  }

};

module.exports = middleware;
