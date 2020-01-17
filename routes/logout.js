const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    console.log('post logout');
    req.session = null;
    res.redirect('/');
  });

  return router;
};
