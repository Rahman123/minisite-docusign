
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

app.get('/', function(req, res) {
  res.render('index', 
    { title: 'Home', 
      banner: 'banner_about.png',
      menu: menus(req.route.path)
    }
  )
});

app.get('/challenges', function(req, res) {
  res.render('challenges', 
    { title: 'Open Challenges', 
      banner: 'banner_challenges.png',
      menu: menus(req.route.path)
    }
  )
});

app.get('/leaderboard', function(req, res) {
  res.render('leaderboard', 
    { title: 'Leaderboard', 
      banner: 'banner_leaderboard.png',
      menu: menus(req.route.path)
    }
  )
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
