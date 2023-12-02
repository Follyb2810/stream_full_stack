const mongoose=require('mongoose')
const dotenv=require('dotenv')
const fs =require('fs')
dotenv.config({path:'./config.env'})
const Movie =require('./../model/movieModel')

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((con)=> console.log(con+ 'db succesful'))
.catch(err =>console.log(err))


const movies = JSON.parse(fs.readFileSync('./data/movies.json','utf-8'))

const deleteMovies = async ()=>{
    try {
        await Movie.deleteMany()
        console.log('data success deleted')
    } catch (error) {
        console.log(error.message)
    }
    process.exit()
}


const ImportMovies = async ()=>{
    try {
        await Movie.create(movies)
        console.log('data success deleted')
    } catch (error) {
        console.log(error.message)
    }
    process.exit()
}

// console.log(process.argv)
if(process.argv[1] === '--import'){
    importScripts()
}
if(process.argv[1] === '--delete'){
    deleteMovies()
}