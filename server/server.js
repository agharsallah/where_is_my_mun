// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors     = require('cors');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var Shape   = require('./app/models/shape'); // get our shape model

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(cors());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true,limit: '100mb' }));
app.use(bodyParser.json({limit: '100mb'}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================
app.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({ 
		name: 'Isie', 
		password: 'Isie@ndDi',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});
app.post('/addshape', function(req, res) {
	var shape = new Shape();		// create a new instance of the Bear model
		shape.name = req.body.name;  // set the bears name (comes from the request)
		shape.data = req.body.data;  // set the bears name (comes from the request)

		shape.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'shape created!' });
		});

});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {
	// find the user
	console.log(JSON.stringify(req.headers));
	User.findOne({
		name: req.headers['name']
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			return res.status(403).send({ 
				success: false, 
				message: 'user dosent exist.'
			});
		} else if (user) {

			// check if password matches
			if (user.password != req.headers['password']) {
				return res.status(403).send({ 
					success: false, 
					message: 'false password.'
				});
			} else {
				next();
			}		

		}

	});
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.route('/isie/:gouv')

.get(function(req, res) {
	Shape.findOne({name:req.params.gouv}, function(err, datashape) {
			if (err)
				res.send(err);
			res.json(datashape);
		});
});

app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
