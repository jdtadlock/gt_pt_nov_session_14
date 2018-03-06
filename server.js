var express = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 5000;
var path = require('path');
var Product = require('./models/Product');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gt_pt_14'
});
 
db.connect();

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'})); // we pass an object into express handlebars to add layout functionality
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.render('index', { 
		name: 'JD',
		fruits: ['apple', 'orange', 'grape'],
		people: ['John', 'Sarah', 'Bob'],
		products: [
			{
				name: 'Computer',
				price: 800 
			},
			{
				name: 'Book',
				price: 5
			},
			{
				name: 'Tablet',
				price: 99
			}
		] 
	}); // Render will load a template by <name>
});

app.get('/products', function(request, response) {
	Product.getAll(db, function(results) {
		response.render('products', {products: results}); // Render will load a template by <name>
	});
});

app.post('/products', function(request, response) {
	// console.log(request.body); // { name: 'something I typed in the name input', price: 100 }
	Product.create(db, request.body, function(results) {
		response.redirect('/products');
	});	
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});




