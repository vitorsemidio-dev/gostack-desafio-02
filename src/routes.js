import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import idMiddleware from './app/middlewares/CheckId';

const routes = new Router();

routes.get('/students', StudentController.index);
routes.get('/students/:id', idMiddleware, StudentController.show);

routes.put(
  '/students/:id',
  authMiddleware,
  idMiddleware,
  StudentController.update
);

routes.delete('/students', (req, res) => {
  return res.json({ msg: 'Hello students delete' });
});

routes.post('/students', StudentController.store);

routes.post('/admin', UserController.store);

routes.post('/sessions', SessionController.store);

export default routes;
