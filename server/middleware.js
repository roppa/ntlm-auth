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

  /**
   * catch 404 and forward to error handler
   */
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /**
   * production error handler - no stacktraces leaked to user
   */
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      status: res.statusCode,
      message: err.message,
      error: err
    });
  });

};

module.exports = middleware;
