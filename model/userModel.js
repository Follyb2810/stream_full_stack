const mongoose =require('mongoose')
const validator = require('validator');
const bycript = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name']
    },
    email:{
        unique:true,
        type:String,
        required:[true,'please enter an email'],
        lowercase:true,
        validate:[validator.isEmail,'please enter valid email']
    },
    photo:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin","editor"],
        default:'user'
    },
    password:{
        require:[true,'please enter the password '],
        type:String,
        minLength:8,
        select:false
    },
    confirmPassword:{
        require:[true,'please enter the password '],
        type:String,
        minLength:8,
        validate:{
            //! only work for save() and create()
            validator:function(val){
                return val === this.password
            },
            message:'password & confirm does not match'
        },
    },
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordTokenExpres:Date
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password =await bycript.hash(this.password,12)
    this.confirmPassword=undefined
    next()
})

userSchema.methods.comparePasswordInDb = async function(pswd,pswdDB){
    return await bycript.compare(pswd,pswdDB)
}

userSchema.methods.isPasswordChange=async function(jwtTimestamp){
    if(this.passwordChangeAt){
        const pwdChangeTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000,10)
        return jwtTimestamp< passwordChangeAt
        console.log(this.passwordChangeAt,jwtTimestamp,pwdChangeTimestamp)
    }
    return false;
}

userSchema.methods.createResetPasswordToken= async function(){
    const resetToken = crypto.randomBytes(32).toString('hex') 
   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
   this.passwordTokenExpres =Date.now() + 10 * 60* 100
   console.log(resetToken,this.passwordResetToken)

   return resetToken
}

const User = mongoose.model('user',userSchema)
module.exports=User


//!107