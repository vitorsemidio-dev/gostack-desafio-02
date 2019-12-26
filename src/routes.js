import { Router } from 'express';

import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.get('/students', (req, res) => {
  return res.json({ msg: 'Hello students get' });
});

routes.put('/students', (req, res) => {
  return res.json({ msg: 'Hello students put' });
});

routes.post('/students', StudentController.store);

routes.delete('/students', (req, res) => {
  return res.json({ msg: 'Hello students delete' });
});

export default routes;
