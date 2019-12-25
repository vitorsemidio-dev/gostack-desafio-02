const { Router } = require('express');

const routes = new Router();

routes.get('/students', (req, res) => {
  return res.json({ msg: 'Hello students' });
});

module.exports = routes;
