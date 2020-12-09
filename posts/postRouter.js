const express = require('express');

const router = express.Router();

const posts = require('./postDb')


// customed middleware post by id if it exists

const validatePostId =()=>{
  return (req,res,next)=>{
    let id =req.params.id
    posts.getById(id)
    .then(post=>{
      if(post){
     
        res.status(200).json(post)
       next()
      } else{
        res.status(404).json({message:"No posts exist with id " + id})
      }

    })
    .catch(err=>next(err))
    
    // next()
  }
}


// custom middleware to validate post input

function validatePost(){
  return (req, res, next)=>{
    // check if body content is valid has text

    if(!req.body.text){
     return res.status(404).json({message:"You should include a text for the post"})
    }
    next()
  }
}

router.get('/', (req, res,next) => {
  // do your magic!
  posts.get()
  .then(posts=>res.status(200).json(posts))
  .catch(err=>next(err))
});

router.get('/:id', validatePostId(),(req, res,next) => {
  // do your magic!

  res.status(200).json(req.body)
  next()
});

router.delete('/:id', validatePostId(),(req, res,next) => {
  // do your magic!
  posts.remove(req.params.id)
  .then(()=>{res.status(204).json({message:` Post id ${req.params.id} is deleted successfully`})})
  .catch(err=>next(err))
});

router.put('/:id',   validatePost(),  validatePostId(), (req, res,next) => {
  // do your magic!
  console.log("params in put ", req.params.id)

  posts.update(req.params.id,req.body)
  .then(updated => {
  
    res.status(202).json(updated)
    next()

  })
  .catch(err=>next(err))

});




module.exports = router;
