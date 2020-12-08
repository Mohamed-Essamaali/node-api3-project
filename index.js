// code away!
const express = require('express')

const userRoute = require('./users/userRouter')
const {logger} = require('./custom_Middleware/logger')

const colors = require('colors')

const server = express()

server.use(logger())

server.use('/users/', userRoute)

const port = 5000

server.listen(port,()=>{
    console.log('   Server is listening on port 5000  '.grey)
})