const express =require('express')
const router = express.Router()
const morgan = require('morgan')
const fs = require('fs')
const {UpdateMovie,deleteMovie,getAllMovies,getMovie,postMovie, checkid, validateBody, getHighestRated, getMovieStats}=require('./../controller/moviesController')
const { Protect, restrict } = require('../controller/authControler')
let movies =JSON.parse(fs.readFileSync('./data/movies.json'))
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
//         r es.status(204).json({
//             status:'sucess',
//             data:{
//                 movies:null
//             }
    
//         })
//     })

// }

// router.param('id',(req,res,next,value)=>{
//     console.log(value)
//     next()
// })
// router.param('id',checkid)
router.route('/highest-rate').get(getHighestRated,getAllMovies)
router.route('/movie-stats').get(getMovieStats)
router.route('/')
            .get(getAllMovies)
            .post(postMovie)
router.route('/:id')
    .get(Protect,getMovie)
    .patch( UpdateMovie)
    .delete(Protect,restrict('admin'),deleteMovie)
    //! having two role to delete
    .delete(Protect,restrict('admin','editor'),deleteMovie)



    module.exports=router 