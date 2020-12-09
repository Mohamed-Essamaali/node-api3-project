const express = require('express');

const router = express.Router();
const users = require('./userDb')
const posts = require('../posts/postDb')



router.post('/', validateUser(),(req, res,next) => {
  // do your magic!

let newUser = req.body

  users.insert(newUser)
  .then(post=>{
      res.status(201).json(post)
      // next()
    })
  .catch(err=>next(err))
});


router.post('/:id/posts',validateUserId(), validatePost(), (req, res,next) => {
  // do your magic!
  let newPost = req.body
  newPost.user_id = req.params.id
  posts.insert(newPost)
  .then(post=>{
    res.status(201).json(post)
     next()
    })
    .catch(err=>next(err))
  
});

router.get('/', (req, res,next) => {
  // do your magic!
  const messageOfTheDay = process.env.MOTD || 'Hello World!'
  users.get()
  .then(users=>{

    res.status(201).json(users, messageOfTheDay)

  })
  .catch(err=>next(err))
});

router.get('/:id', validateUserId(),(req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res,next) => {
  // do your magic!
  let id = req.params.id
  users.getUserPosts(id)
  .then(posts=>{
    if(posts.length){
      res.status(200).json(posts)
    } else {
      res.status(404).json({message: `No Posts for user id ${id}`})
    }
    

  })
  .catch(err=>next(err))
});

router.delete('/:id', validateUserId(), (req, res,next) => {
  // do your magic!
  users.remove(req.params.id)
  .then(()=>{
    res.json({message:"User is deleted successfully"})
    next()
  })
  .catch(err=>next(err))

  
});

router.put('/:id',validateUserId(), validateUser(),(req, res,next) => {
  // do your magic!
  let id = req.params.id
  users.update(id,req.body)
  .then(updated=>{
    res.status(204).json(updated)
    
  })
  .catch(err=>next(err))
});

//custom middleware

function validateUserId(){

  return (req, res, next) =>{
    // do your magic!
    
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

function validateUser() {
  // do your magic!
  return (req, res, next)=>{
    
    let newUser = req.body
  if(!newUser.name){
   return res.status(400).json({message: "missing user data"})
  }
  next()
}
}

function validatePost(){
  return (req, res, next)=>{
    // do your magic!
    let newPost = req.body.text
    if(!newPost){
     return res.status(400).json({message:"missing post data"})
    }
    next()
  }
}

module.exports = router;
