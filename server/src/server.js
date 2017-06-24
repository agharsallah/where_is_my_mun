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
var router = require('./router'); // get our config file

var User   = require('./app/models/user'); // get our mongoose model
var Shape   = require('./app/models/shape'); // get our shape model
var Polling   = require('./app/models/polling'); // get pollings model
var Statistics   = require('./app/models/statistics'); // get Stat model

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(cors());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true,limit: '100mb',parameterLimit: 1000000 }));
app.use(bodyParser.json({limit: '100mb'}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================

var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {
	// find the user
	//console.log(JSON.stringify(req.headers));
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

router.default(app,apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
