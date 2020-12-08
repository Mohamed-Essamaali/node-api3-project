

module.exports = ()=>{
    return((req,res,next)=>{
    
        console.log(` From ${req.ip} Using ${req.method}  method, from url  ${req.url} on ${new Date().toISOString()}`)
        next()
    })
}