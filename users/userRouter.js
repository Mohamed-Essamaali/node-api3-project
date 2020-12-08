const express = require('express');

const router = express.Router();
const users = require('./userDb')
const checkUserId = require('../custom_Middleware/usersMiddleware')

router.post('/', (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then(post=>{
    res.status(201).json(post)
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then(posts=>{
    res.status(201).json(posts)
  })
  .catch(err=>console.log(err))
});

router.use('/:id', checkUserId,(req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
