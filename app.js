var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),
pq = require('pg'),
dbUrl = require('./secrets/url.js'),
app = express();
console.log(dbUrl)
var connect = "postgres://superkitty:xxx@localhost/recipebookdb";
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
res.render('index');
});
//server
app.listen(3000, function(){
  console.log('Server listening in port 3000');
  console.log(dbUrl)
});
