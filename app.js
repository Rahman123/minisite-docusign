
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

// set some vars specific to this app
app.locals.appName = 'DocuSign';
app.locals.siteLogo = 'docusign.jpg';
app.locals.challengesApiEndpoint = 'http://api.topcoder.com/v2/develop/challenges';
app.locals.leaderboard = 'http://tc-leaderboard.herokuapp.com/ibm';

// this is kind of a hack to get the menus to highlight correctly.
// this is dependent on the css and not sure how easy it is to add new menu items
var menus = function(selected) {
  var default_menus =  {
    home: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-184',
    challenges: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-189',
    leaderboard: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-190'
  }
  if (selected === '/') {
    default_menus.home = 'menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-12 current_page_item menu-item-184';
  } else if (selected === '/challenges') {
    default_menus.challenges = 'menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-29';
  } else if (selected === '/leaderboard') {
    default_menus.leaderboard = 'menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-111 current_page_item menu-item-190';
  }
  return default_menus;
}

var get_challenges = function(req, res, next) {
  http.get(app.locals.challengesApiEndpoint, function(res){
      var data = '';
      res.on('data', function (chunk){
          data += chunk;
      });
      res.on('end',function(){
          var challenges = JSON.parse(data);
          req.challenges = challenges.data;
          return next();
      })
  })
}

var get_leaderboard = function(req, res, next) {
  http.get(app.locals.leaderboard, function(res){
      var data = '';
      res.on('data', function (chunk){
          data += chunk;
      });
      res.on('end',function(){
          var leaderboard = JSON.parse(data);
          req.leaderboard = leaderboard;
          return next();
      })
  })
}

app.get('/', function(req, res) {
  res.render('index', 
    { 
      title: 'Home', 
      banner: 'banner_about.png',
      menu: menus(req.route.path)
    }
  )
});

app.get('/challenges', get_challenges, function(req, res) {
  res.render('challenges', 
    { 
      title: 'Open Challenges', 
      banner: 'banner_challenges.png',
      menu: menus(req.route.path),
      challenges: req.challenges
    }
  )
});

app.get('/leaderboard', get_leaderboard, function(req, res) {
  console.log(req.leaderboard);
  res.render('leaderboard', 
    { 
      title: 'Leaderboard', 
      banner: 'banner_leaderboard.png',
      menu: menus(req.route.path),
      leaderboard: req.leaderboard
    }
  )
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
