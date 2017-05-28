var React = require('react');
var ReactDOMServer = require('react-dom/server');
var DOM = React.DOM;
var body = DOM.body;
var div = DOM.div;
var script = DOM.script;
var link = DOM.link;
var title = DOM.title;

var browserify = require('browserify');
var babelify = require("babelify");

var express = require('express');
var app = express();

app.set('port', (process.argv[2] || 3000));
app.set('view engine', 'jsx');
app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine({ transformViews: false }));

require('babel/register')

var Main = require('./views/index.jsx');

app.use('/bundle.js', function (req, res) {
  res.setHeader('content-type', 'application/javascript');

  browserify({ debug: true })
      .transform(babelify.configure({
          presets: ["react", "es2015"],
          compact: false
      }))
      .require("./app.js", { entry: true })
      .bundle()
      .pipe(res);
});

var data = [
    {
      a: '14959f4295852fad0b89f8227a4fb255',
      b: '3e2dbdccccbbb89611eb0a2a4ea24ed546464ec9'
    }
]


app.use('/', function (req, res) {
  var initialData = JSON.stringify(data);
  var markup = ReactDOMServer.renderToString(React.createElement(Main, {data: data}));

  res.setHeader('Content-Type', 'text/html');


  var html = ReactDOMServer.renderToStaticMarkup(
      body(
          null, 
          div({id: 'app', dangerouslySetInnerHTML: {__html: markup}}),
          script({ src: 'https://code.jquery.com/jquery-2.1.1.min.js'}),
          script({ src: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'}),
          script({
            id: 'initial-data',
            type: 'text/plain',
            'data-json': initialData
        }),
        script({src: '/bundle.js'})
     ));

  res.end(html);
});



app.listen(app.get('port'), function() {
  console.log('listening on port 3000')
})
