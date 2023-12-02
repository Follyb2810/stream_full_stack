const fs = require('fs')
const path =require('path')
const CustomError =require('./../utils/customError')
const asyncErrorHandler =require('./../utils/asyncErrorHandler')
const Movie = require('./../model/movieModel')
let movies =JSON.parse(fs.readFileSync('./data/movies.json'))
const Apifeatures =require('./../utils/Apifeatures')
// let movies =JSON.parse(fs.readFileSync('./data/movies.json'))
//! using asynchandler
const getAllMovie =asyncErrorHandler(async(req,res,next )=>{
    const features = new Apifeatures(Movie.find(),req.query).filter().sort().limitfields().paginate()
       const movies = await features.query
       res.status(200).json({
        status:"success",
        count:movies.length,
        data:{
            movies
        }
    })
})
const getAllMovies=async(req,res)=>{
    try {
        const features = new Apifeatures(Movie.find(),req.query).filter().sort().limitfields().paginate()
       const movies = await features.query
       
       
        //? /
        // const excludeField =['sort','page','limit','fields']
        // const queryObj={...req.query}
        // excludeField.forEach((el)=>{
        //     delete queryObj[el]
        // })
        // const movies = await Movie.find(queryObj)

        // !filter looc
        // let queryStr=JSON.stringify(req.query)
        // queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
        // const queryObj=JSON.parse(queryStr)
        // let query = Movie.find(queryObj)

        // ! sorting logic
        // if(req.query.sort){
        //     const sortby = req.query.sort.split(',').join(' ')
        //     query=query.sort(sortby)
        // }else{
        //     query=query.sort('-createdAt')
        // }

        // !limiting fields
        // if(req.query.fields){
        //     //? query.select('name duration price rating)
        //     const fields = req.query.fields.split(',').join(' ')
        //     query=query.select(fields)
        // }else{
        //     query=query.select('-v')
        // }

        //! pagination
        // const page = req.query.page || 1
        // const limit = req.query.limit || 10
        // const skip=(page -1) * limit
        // query=query.skip(skip).limit(limit)

        // if(req.query.page){
        //     const moviesCount= await  Movie.countDocuments()
        //     if(skip >= moviesCount){
        //         throw new Error('this page is not found')
        //     }
        // }
        // const movies = await query
        // const movies = await Movie.find()
    res.status(200).json({
        status:"success",
        count:movies.length,
        data:{
            movies
        }
    })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error.message
        })
        
    }
}
const getHighestRated=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-rating'

    next()
}
// const getAllMovies=(req,res)=>{
//     res.status(200).json({
//       status:"success",
//       count:movies.length,
//       data:{
//           movies
//       }
//     })
//   }

//! 


 const validateBody =(req,res,next)=>{}
//  const validateBody =(req,res,next)=>{
//     if(!req.body.name || !req.body.year){
//         return res.status(400).json({
//             status:'fail',
//             mess:'not a valid movie data'
//         })
//     }
//     next()
//  }
//! removing try and catch
//!

const createMovie=asyncErrorHandler(async(req,res,next)=>{
    const movie=await Movie.create(req.body)
    res.status(201).json({
        status:'succes',
        data:{
            createMovie
        }
    })

})
  const postMovie= async(req,res)=>{
    // const testMovie = new movies({})
    // testMovie.save()
    // res.status(201).json({
    //     status:'succes',
    //     data:{
    //         testMovie
    //     }
    // })
    try {
        const createMovie =await Movie.create(req.body)
        res.status(201).json({
            status:'succes',
            data:{
                createMovie
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error.message
        })
    }
  }
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

// const checkid =(req,res,next,value)=>{}
const checkid =(req,res,next,value)=>{
    const movie = movies.find(el =>el.id === value)
    if(!movie){
        return res.status(404).json({
            status:'fail',
            mess:'move with '+id+ 'not availaible'
        })
    }
    next()
}

const getMovi = asyncErrorHandler(async(req,res,next)=>{
    const movie = await Movie.find({_id:req.params.id})
    console.log(movie)
    const movieId = await Movie.findById(req.params.id)
    if(!movie){
        const error = new CustomError('movie with Id not found',404)
        return next(error )
    }
    res.status(200).json({
        status:"success",
        data:{
            movie
        }
    })
})
  const getMovie =async(req,res)=>{
try {

    let queryStr =JSON.stringify(req.qury)
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
    const queryObj =JSON.parse(queryStr)
    // ? for 6.0 or less
     //! const queryMovie = await Movie.find(req.query)  //using query string method 1 localhos:8000/api/v1/movies/?rating=12&duration=2
    //! const queryMovie = await Movie.find() //using query string method 2  localhos:8000/api/v1/movies/?rating=12&duration=2
                    //! .where('duration').equals(req.query.duration)
                    //! .where('rating').equals(req.query.rating)
                    // const excludesField=['sort','page','limit','field']
                    // const quertObj ={...req.query}
                    // excludesField.forEach((el)=>{
                    //     delete quertObj[el]
                    // })
                    // ?for mongoose
    const movie = await Movie.find({_id:req.params.id})
    console.log(movie)
    const movieId = await Movie.findById(req.params.id)
    res.status(200).json({
        status:"success",
        data:{
            movie
        }
    })
} catch (error) {
    res.status(400).json({
 status:"fail",
 message:error.message
    })
}
  }
//   const getMovie =(req,res)=>{
//     const id = req.params.id 
//     console.log(id)
//     // const getMovies = movies.find(el=>el.id === parseInt(id))
//     // console.log(getMovies)
//     // if(!getMovies){
//     //     return res.status(404).json({
//     //         status:'fail',
//     //         mess:'move with '+id+ 'not availaible'
//     //     })
//     // }
//     res.status(200).json({
//         status:'sucess',
//         data:{
//             getMovies
//         }

//     })
// }
const updateMovi=asyncErrorHandler(async(req,res,next)=>{
    
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) //! new make it return the updated document
        if(!movie){
            const error = new CustomError('movie with Id not found',404)
            return next(error )
        }
        res.status(200).json({
            status:"success",
            data:{
                movie 
            }
        })
})
const UpdateMovie=async(req,res)=>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) //! new make it return the updated document
        res.status(200).json({
            status:"success",
            data:{
                movie 
            }
        })
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error.message
        })
    }
}
// const UpdateMovie=(req,res)=>{
//     const id = parseInt(req.params.id)
//     // const movieToUpdate= movies.find(el =>el.id === id)
//     // if(!movieToUpdate){
//     //     return res.status(404).json({
//     //         status:'fails',mess:'no movie obeject '+id+' found'
//     //     })
//     // }
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

const deleteMovi=asyncErrorHandler(async(req,res,next)=>{
   const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie){
        const error = new CustomError('movie with Id not found',404)
        return next(error )
    }
    res.status(204).json({
       status:'success'})
})

const deleteMovie=async(req,res)=>{
try {
     await Movie.findByIdAndDelete(req.params.id)
     res.status(204).json({
        status:'success'})
} catch (error) {
      res.status(204).json({
            status:'fail',
            message:error.message
      })
}
}
// const deleteMovie=(req,res)=>{
//     const id = parseInt(req.params.id)
//     // const movieToDelete = movies.find(el=>el.id === id)
//     // if(!movieToDelete){
//     //     return res.status(404).json({
//     //         status:'fails',mess:'no movie obeject '+id+' found to delete  '
//     //     })
//     // }
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
const getMovieStat=asyncErrorHandler(async(req,res,next)=>{
    const stats =await  Movie.aggregate([
        {$match:{ratings:{$gte:4.5}}},
        {$group:{
            _id:'realeseYear ',
            // _id:null,
            avgRating:{$avg:"$ratings"},
            avgPrice:{$avg:"$price"},
            minPrice:{$min:"$price"},
            maxPrice:{$max:"$ratings"},
            priceTotal:{$sum:"$price"},
            movieCount:{$sum:1}
        
        }},
        {$sort:{minPrice:1}},
        {$match:{maxPrice:{$gte:60}}}
    ])
    res.status(200).json({
        status:"success",
        data:{
            stats 
        }})
})
const getMovieStats=async(req,res)=>{
    try {
        const stats =await  Movie.aggregate([
            {$match:{ratings:{$gte:4.5}}},
            {$group:{
                _id:'realeseYear ',
                // _id:null,
                avgRating:{$avg:"$ratings"},
                avgPrice:{$avg:"$price"},
                minPrice:{$min:"$price"},
                maxPrice:{$max:"$ratings"},
                priceTotal:{$sum:"$price"},
                movieCount:{$sum:1}
            
            }},
            {$sort:{minPrice:1}},
            {$match:{maxPrice:{$gte:60}}}
        ])
        res.status(200).json({
            status:"success",
            data:{
                stats 
            }})
        
    } catch (error) {
        res.status(204).json({
            status:'fail',
            message:error.message
      }) 
    }
}
const getMovieByGenrie = asyncErrorHandler(async(req,res,next)=>{
    const genre=req.params.genre
    const movie =await Movie.aggregate([
        {$unwind:'$genrew'},
        {$group:{
            _id:'$genre',
            movieCount:{$sum:1},
            movies:{$push:'$name'},
        }},
        {$addFields:{genre:'$_id'}},
        {$project:{_id:0}},
        {$sort:{movieCount:-1}},

    ])
    res.status(200).json({
        status:"success",
        count:movie.length,
        data:{
            movie
        }})
})

module.exports ={getMovieStats,getHighestRated,getAllMovies,getMovie,UpdateMovie,deleteMovie,postMovie,checkid,validateBody}


//   {
//     "name":"folly advance movie model",
//     "description":"folly in node2 ",
//     "duration":1.2,
//     "rating":9,
//     "totalRating":10,
//     "releaseYear":2000,
//     "releasedate":"20012-09-04",
//     "genres":[
//       "Action","Sci-fi","Thriller"
//       ],
//       "directors":["folly babs"],
//       "coverImage":"folly.jpg",
//       "actors":[
//         "folly","akin","kash"
//         ],
//       "price":50
//   }