'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pollingController = require('./controllers/pollingController');

var _shapeController = require('./controllers/shapeController');

var _irieController = require('./controllers/irieController');

var _registrationSpotsController = require('./controllers/registrationSpotsController');

var _munCoordController = require('./controllers/munCoordController');

var _statisticsController = require('./controllers/statisticsController');

var _locationStatController = require('./controllers/locationStatController');

var _userController = require('./controllers/userController');

var router = function router(app, apiRoutes) {
  app.post('/setup', _userController.postUser);

  app.use('/api', apiRoutes);

  apiRoutes.get('/polling/:gouv', _pollingController.getPolling);
  apiRoutes.post('/addpolling', _pollingController.postPolling);

  apiRoutes.get('/shape/:gouv', _shapeController.getShape);
  apiRoutes.post('/addshape', _shapeController.postShape);

  apiRoutes.get('/irie/:gouv', _irieController.getIrie);
  apiRoutes.get('/iries', _irieController.getAllIrie);
  apiRoutes.post('/addirie', _irieController.postIrie);

  apiRoutes.get('/oneregspot/:gouv', _registrationSpotsController.getOneRegistrationSpot);
  apiRoutes.get('/regspots', _registrationSpotsController.getRegistrationSpots);
  apiRoutes.post('/addregspots', _registrationSpotsController.postRegistrationSpot);

  apiRoutes.get('/onemuncoord/:gouv', _munCoordController.getOneMunCoord);
  apiRoutes.get('/muncoords', _munCoordController.getMunCoords);
  apiRoutes.post('/addmuncoord', _munCoordController.postMunCoord);

  apiRoutes.post('/addstat', _statisticsController.postStatistics);

  apiRoutes.post('/addlocationstat', _locationStatController.postLoctionStat);
};

exports.default = router;