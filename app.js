
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socket = require('./routes/socket.js')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , sugar = require('sugar');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

function nibCompile(str, path){
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('U2FsdGVkX19HiCY8aVoN15eG84LlTt7hJUIKk3pCT6E='));
  app.use(express.session());
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: nibCompile
  }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

io.sockets.on('connection', socket);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
