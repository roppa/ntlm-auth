'use strict';

let app = require('express')();
let middlewareConfig = require('./config');

require('./server/middleware')(app, middlewareConfig);

module.exports = app;
