/*jshint node: true */

"use strict";

var http = require('http'),
    express = require('express'),
    i18next = require('i18next');

var app = express();

i18next.init({
  ns: {
    namespaces: ['translation'],
    defaultNs: 'translation',
    debug: true
  }
});

// Express app configuration code and lingua init.
app.configure(function () {
  app.set('port', process.env.PORT || 9898);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use('/locales', express.static(__dirname + '/locales'));
  app.use(i18next.handle);
  app.use(app.router);
  app.get('/', function (req, res, next) {
    res.render('index');
  });
});

i18next.registerAppHelper(app)
       .serveClientScript(app)
       .serveDynamicResources(app)
       .serveMissingKeyRoute(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
