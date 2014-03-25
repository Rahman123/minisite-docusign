
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var expressLayouts = require('express-ejs-layouts')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon("public/images/favicon.ico")); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(expressLayouts)
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', 
    { title: 'Home', banner: 'banner_about.png' }
  )
});

app.get('/challenges', function(req, res) {
  res.render('challenges', 
    { title: 'Open Challenges', banner: 'banner_challenges.png' }
  )
});

app.get('/leaderboard', function(req, res) {
  res.render('leaderboard', 
    { title: 'Leaderboard', banner: 'banner_leaderboard.png' }
  )
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
