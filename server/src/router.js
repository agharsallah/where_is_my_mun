import { getPolling, postPolling } from './controllers/pollingController';
import { getShape, postShape } from './controllers/shapeController';
import { getIrie, postIrie,getAllIrie } from './controllers/irieController';
import { postStatistics } from './controllers/statisticsController';
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

  apiRoutes.post('/addstat', postStatistics);
};

export default router;
