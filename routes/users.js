var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/')

  // create a new user (accessed at POST http://localhost:3000/users)
  .post(function(req, res) {
    res.sendStatus(200);
  })

  // get all users (accessed at GET http://localhost:3000/users)
  .get(function(req, res) {
    res.sendStatus(200);
  });

router.route('/:id')

  // get the user with that id (accessed at GET http://localhost:3000/users/:id)
  .get(function(req, res) {
    res.sendStatus(200);
  })

  // update the user with this id (accessed at PUT http://localhost:3000/users/:id)
  .put(function(req, res) {
    res.sendStatus(200);
  })

  // delete the user with this id (accessed at DELETE http://localhost:3000/users/:id)
  .delete(function(req, res) {
    res.sendStatus(200);
  });

module.exports = router;
