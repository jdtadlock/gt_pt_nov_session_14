
var Product = {
	create: function(db, data, callback) {
		db.query('INSERT INTO products SET ?', data, function(err, result) {
			if ( err ) return console.log(err);
			callback(result);
		});
	},

	getAll: function(db, callback) {
		db.query('SELECT * FROM products', function(err, results) {
			if ( err ) return console.log(err);
			callback(results);
		});
	}
}

module.exports = Product;

// Product.someMethod();