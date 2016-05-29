var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),
pg = require('pg'),
conString = require('./secrets/url.js'),
app = express();

//Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);
//Set Default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//lets set the public folder
app.use(express.static(path.join(__dirname, 'public')));
//bodyparser mw
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(req, res){
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM recipes', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
     res.render('index', {recipes: result.rows});
     done();
    });
  });
});
//server
app.listen(3000, function(){
  console.log('Server listening in port 3000');
});
