const mongoose = require('mongoose')
const validator=require('validator')
const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        maxLength:[100,'movie name must not  more than 100 character'],
        minLength:[4,'movie name must have at least 4 character'],
        // validatate:[validator.isAlpha,'Name should only contain alphabert']
    },
    description:{
        type:String,
        require:[true,'description is require'],
        trim:true
    },
    duration:{
        type:Number,
        require:[true,'duration is require'],
        min:[1,'rating must be 1.0 or above'],
        max:[1,'rating must be 10 or below'],
        validate:function(value){
            return value >= 1 && value <= 10
        }
    },
    rating:{
        type:Number,
        default:1.0,
        validate:{
            validator:function(value){
            return value >= 1 && value <= 10
        },
    message:'rating should be ({VALUE }) above 1 and below 10'
}
    },
    totalRating:{
        type:Number
    },
    releaseYear:{
        type:Number,
        require:[true,'release year is require']
    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    genres:{
        type:[String],
        require:[true,'genres is required'],
        enum:{
            values:['Action','Adventure','sci-fi','thriller','crime'],
            message:'this genries does not exit'
    }
    },
    directors:{
        type:[String],
        require:[true,'director is required']
    },
    actors:{
        type:[String],
        require:[true,'actors is require']
    },
    coverImage:{
        type:String,
        require:[true,'coverImage is require']
    },
    price:{
        type:Number,
        require:[true,'price is require']
    }

})

const Movie = mongoose.model('Movies',movieSchema)

module.exports= Movie