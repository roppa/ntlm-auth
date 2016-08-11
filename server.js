'use strict';

require('dotenv-safe').load();

let app = require('.');
let middlewareConfig = require('./config');
require('./server/middleware')(app, middlewareConfig);

app.listen(process.env.PORT);
