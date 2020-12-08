const users = require('../users/userDb')


const checkUserId = (req,res,next)=>{
        // let {id} = req.params
        users.getById(req.params.id)
        .then(user=>{
            if(user){
                req.user=user
                next()
            }else 
            res.status(404).json({message: `User with id ${id} doesn't exist `})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message:'someting is wrong'})
        })

    }





module.exports = checkUserId
