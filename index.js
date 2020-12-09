// code away!
const express = require('express')

const userRoute = require('./users/userRouter')
const postRoute = require('./posts/postRouter')
const {logger} = require('./custom_Middleware/logger')

const colors = require('colors')

const server = express()
server.use(express.json())

// server.use(logger())

server.use(('/users'),userRoute)
server.use(('/posts'),postRoute)

server.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({message: 'Something went bad try again later'})
    next()
})

const port = 5000

server.listen(port,()=>{
    console.log('   Server is listening on port 5000  '.grey)
})