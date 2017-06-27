import { getPolling, postPolling } from './controllers/pollingController';
import { getShape, postShape } from './controllers/shapeController';
import { getIrie, postIrie,getAllIrie } from './controllers/irieController';
import { getOneRegistrationSpot, getRegistrationSpots,postRegistrationSpot } from './controllers/registrationSpotsController';
import { postStatistics } from './controllers/statisticsController';
import { postLoctionStat } from './controllers/locationStatController';
import { postUser } from './controllers/userController';

const router = (app,apiRoutes) => {
  app.post('/setup',postUser );

  app.use('/api', apiRoutes);

  apiRoutes.get('/polling/:gouv', getPolling);
  apiRoutes.post('/addpolling', postPolling);
 
  apiRoutes.get('/shape/:gouv', getShape);
  apiRoutes.post('/addshape', postShape);

  apiRoutes.get('/irie/:gouv', getIrie);
  apiRoutes.get('/iries', getAllIrie);
  apiRoutes.post('/addirie', postIrie);

  apiRoutes.get('/oneregspot/:gouv', getOneRegistrationSpot);
  apiRoutes.get('/regspots', getRegistrationSpots);
  apiRoutes.post('/addregspots', postRegistrationSpot);

  apiRoutes.post('/addstat', postStatistics);

  apiRoutes.post('/addlocationstat', postLoctionStat);
};

export default router;
