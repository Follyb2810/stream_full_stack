const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
// const movies = require('./data/movies.json')
let port = 8000
const path=require('path')
const moviesRouter=require('./Routes/moviesRoutes')
const customError =require('./utils/customError')
const CustomError = require('./utils/customError')
const authRouter=require('./Routes/authRouter')
const { errorHandler } = require('./controller/errorController')
const logger = function(req,res,next){
    console.log('customer middlewar')
    next()
}
app.use(express.json())
app.use(express.static('./public'))
if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"))
}
app.use(logger)
// console.log(app.get('env'))
// let movies =JSON.parse(fs.readFileSync('./data/movies.json'))
// const getAllMovies=(req,res)=>{
//     res.status(200).json({
//       status:"success",
//       requestedAt:req.requestedAt,
//       count:movies.length,
//       data:{
//           movies
//       }
//     })
//   }

//   const postMovie=(req,res)=>{
//     const newId = movies[movies.length -1].id + 1
//     const newMovies = Object.assign({id:newId},req.body)
//     movies.push(newMovies)
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(201).json({
//             status:"succes",
//             data:{
//                 movies:newMovies
//             }
//         })
//     })
// }

//   const getMovie =(req,res)=>{
//     const id = req.params.id 
//     console.log(id)
//     const getMovies = movies.find(el=>el.id === parseInt(id))
//     console.log(getMovies)
//     if(!getMovies){
//         return res.status(404).json({
//             status:'fail',
//             mess:'move with '+id+ 'not availaible'
//         })
//     }
//     res.status(200).json({
//         status:'sucess',
//         data:{
//             getMovies
//         }

//     })
// }
// const UpdateMovie=(req,res)=>{
//     const id = parseInt(req.params.id)
//     const movieToUpdate= movies.find(el =>el.id === id)
//     if(!movieToUpdate){
//         return res.status(404).json({
//             status:'fails',mess:'no movie obeject '+id+' found'
//         })
//     }
//     let index = movies.indexOf(movieToUpdate)
//     Object.assign(updateMovies,req.body)
//     movies[index]=movieToUpdate
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(200).json({
//             status:'sucess',
//             data:{
//                 movieToUpdate
//             }
    
//         })
//     })

// }

// const deleteMovie=(req,res)=>{
//     const id = parseInt(req.params.id)
//     const movieToDelete = movies.find(el=>el.id === id)
//     if(!movieToDelete){
//         return res.status(404).json({
//             status:'fails',mess:'no movie obeject '+id+' found to delete  '
//         })
//     }
//     const index = movies.indexOf(movieToDelete)
//     movies.splice(index,1)
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(204).json({
//             status:'sucess',
//             data:{
//                 movies:null
//             }
    
//         })
//     })

// }


// app.use((req,res,next)=>{
//     req.requestedAt=new Date().toISOString()
//     next()
// })
app.get('/',(req,res)=>{
    res.send('hello folly')
})
app.get('/home', (req, res) => {
    const response = {
        mess: 'hello',
        status: 200,
        headers: {"my-head": "folly is here"}
    };
    // res.writeHead(200, {"my-head": "folly is here"});
    res.json({ mess: 'hello',status: 200});
})
app.get('/home/:id',(req,res)=>{
    const id = req.params
    console.log(id,'this is params')
})
app.get('/home', (req, res) => {
    const id = req.query.id;
    console.log(id,'this is query');
});

// app.get('/home', (req, res) => {
//     res.writeHead(200, {"my-head": "folly is here"});
//     res.end('checking write head');
// res.json({ mess: 'hello',status: 200});
// });
// app.get('/api/v1/movies',getAllMovies)
// console.log(movies)
// app.post('/api/v1/movies',postMovie)

// app.post('/api/v1/movies', (req, res) => {
//     const newId = movies[movies.length - 1].id + 1;
//     const { name, year } = req.body;

//     // Create a new movie object.
//     const newMovie = { id: newId, name, year };

//     // Add the new movie to the list.
//     movies.push(newMovie);

//     // Update the JSON file with the new data.
//     fs.writeFileSync('./data/movies.json', JSON.stringify(movies));

//     res.json({
//         status: "success",
//         count: movies.length,
//         data: newMovie // Return the newly added movie.
//     });
// });

// res.end('checking write head');
// route parameter  movies/:id
// app.get('/api/v1/movies/:id',getMovie)
// app.patch('/api/v1/movies/:id',UpdateMovie)
// app.delete('/api/v1/movies/:id',deleteMovie)

app.use('/api/v1/movies',moviesRouter)  
app.use('/api/v1/users',authRouter)  
app.all('*',(req,res,next)=>{
//    res.status(404).json({
//     status:'fail',
//     mess:`cant finf ${req.originalUrl }`
//    })  
// cons err = new Errow('')
// err.status='fail'
// err.statusCode=404
   const err = new CustomError(`cant find ${req.originalUrl} on the server`,404)
    next(err)
})

app.use(errorHandler)
// app.listen(port,()=>console.log('folly start here ' +port))
module.exports=app