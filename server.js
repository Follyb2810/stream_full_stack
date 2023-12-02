const dotenv=require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path:'./config.env'})
//! top of app so as to catch the exception
// process.on('uncaughtException',(err)=>{
//     console.log(err.name)
//     console.log(err.message)
//     console.log('uncaught Exception occured shutting down')
    
//         process.exist(1)

//   })
const app = require('./index')

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((con)=> console.log(con + 'db succesful'))
.catch(err =>console.log(err))




// const testMovie = new Movie({
//     name:'die hard',
//     description:'Action film of the sean',
//     duration:120,
//     rating:5.0
// })

// testMovie.save()
// .then(res=>console.log(res))
// .catch(err=>console.log(err))

const port= process.env.PORT ||8000

const server= app.listen(port,()=>console.log('folly start here ' +port))

 process.on('unhandledRejection',(err)=>{
   console.log(err.name)
   console.log(err.message)
   console.log('unhandled rejecetion occured shutting down')
   server.close(()=>{
       process.exist(1)
   })
 })
