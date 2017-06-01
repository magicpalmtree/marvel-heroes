var React = require('react');
var ReactDOMServer = require('react-dom/server');
var DOM = React.DOM;
var html = DOM.html;
var body = DOM.body;
var head = DOM.head;
var div = DOM.div;
var script = DOM.script;
var link = DOM.link;
var title = DOM.title;
var meta = DOM.meta;

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

  var myHtml = ReactDOMServer.renderToStaticMarkup(
    html(
      null,
      head(
        null,
        meta({ charSet : 'utf-8'}),
        title(null,'Marvel Characters | Grability'),
        link({ rel: 'shortcut icon', href:'http://camiloarguello.co/img/icons/grability_logo_bt5_icon.ico', type: 'image/x-icon'}),
        meta({ name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'}),
        meta({ name: 'description', content: 'Marvel character search. See your favorite superheroes here!'}),
        meta({ name: 'author', content: 'Camilo Arguello'}),
        link({rel: 'stylesheet' , href: 'http://fonts.googleapis.com/icon?family=Material+Icons'}),
        link({rel: 'stylesheet' , href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'}),
        link({rel: 'stylesheet' , href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'})
      ),
      body(
        null,
        div({id: 'app', dangerouslySetInnerHTML: {__html: markup}}),
        script({ src: 'https://code.jquery.com/jquery-2.1.1.min.js'}),
        script({ src: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'}),
        script({ id: 'initial-data', type: 'text/plain', 'data-json': initialData}),
        script({src: '/bundle.js'})
      )

    )
    );

    res.end(myHtml);

});

app.listen(process.env.PORT, process.env.IP);

// app.listen(app.get('port'), function() {
//   console.log('listening on port 3000')
// })
