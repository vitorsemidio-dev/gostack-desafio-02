import { Router } from 'express';

const routes = new Router();

routes.get('/students', (req, res) => {
  return res.json({ msg: 'Hello students get' });
});

routes.put('/students', (req, res) => {
  return res.json({ msg: 'Hello students put' });
});

routes.post('/students', (req, res) => {
  return res.json({ msg: 'Hello students post' });
});

routes.delete('/students', (req, res) => {
  return res.json({ msg: 'Hello students delete' });
});

export default routes;
