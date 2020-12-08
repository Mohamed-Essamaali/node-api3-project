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

router.post('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then(users=>{
    res.status(201).json(users)
  })
  .catch(err=>console.log(err))
});

router.get('/:id', validateUserId(),(req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(){

  return (req, res, next) =>{
    // do your magic!
    console.log('params',req.params.id)
    users.getById(req.params.id)
        .then(user=>{
            if(user){
                req.user=user
                next()
            }else {
              res.status(404).json({message: `User with id ${req.params.id} doesn't exist `})
            }
           
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message:'someting is wrong'})
         })
   }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
