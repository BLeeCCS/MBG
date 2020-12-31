const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (request, response) => {
    response.render("index.html");
  });

module.exports = router;