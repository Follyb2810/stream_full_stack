const fs = require('fs')
const path =require('path')
const Movie = require('./../model/movieModel')
let movies =JSON.parse(fs.readFileSync('./data/movies.json'))
const Apifeatures =require('./../utils/Apifeatures')


const getAllNovies=(req,res)=>{
    try {
        const features = new Apifeatures(Movie.find(),req.query)
    } catch (error) {
        
    }
}