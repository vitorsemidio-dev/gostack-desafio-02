const { Router } = require('express');

const routes = new Router();

routes.get('/students', (req, res) => {
  return res.json({ msg: 'Hello students' });
});

routes.post('/students', (req, res) => {
  return res.json({ msg: 'Hello students post' });
});

routes.put('/students', (req, res) => {
  return res.json({ msg: 'Hello students put' });
});

module.exports = routes;
