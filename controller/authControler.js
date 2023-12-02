const asyncErrorHandler = require('../utils/asyncErrorHandler')
const CustomError = require('../utils/customError')
const User = require('./../model/userModel')
const util=require('util')
const sendEmail=require('./../utils/email')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const signToken =id=>{
    return token=jwt.sign({id},process.env.SECRET_STR,{expiresIn:process.env.LOGIN_EXPIRES})
}
const signup= asyncErrorHandler(async(req,res)=>{
    const newUser = await User.create(req.body)
    const token=signToken(newUser._id)
    res.status(201).json({
        status:'succes',
        token,
        data:{
            user:newUser
        }
    })
  
  })

  const login = asyncErrorHandler(async(req,res,next)=>{
    // const email= req.body.email
    // const pasword =req.body.password
    const {email,passowrd} =req.body
    if(!email || !passowrd){
        const error = new CustomError('please provide email and password for login',400)
        return next(error)
    }
    const user=await User.findOne({email}).select('+password')
    // const isMatch = await user.comparePasswordInDb(passowrd,user.password)
    if(!user || (await user.comparePasswordInDb(passowrd,user.password))){
        const error = new CustomError('incorrect email or password',400)
        return next(error)
    }
    const token=signToken(user._id)
    res.status(200).json({
        status:'succes',
        token 
    })

  })

  const Protect =asyncErrorHandler(async(req,res,next)=>{

    const testToken = req.headers.authorization
    let token;
    if(testToken && testToken.startsWith('Bearer')){
        token =testToken.split(' ')[1]
    }
    console.log(token)
    if(!token){

        next ( new CustomError('you are not login in',401))
    }

    const decoded= await util.promisify(jwt.verify(token,process.env.SECRET_STR))
    console.log(decoded)
     const user = await User.findById(decoded.id)
     if(!user){
        const error = new CustomError('the user with the given token does not exist',401)
        next(error)
     }
     let isPasswordChange= await user.isPasswordChange(decoded.int)
     if(isPasswordChange){
        const error = new CustomError('password has been changed recently,please log in again',401)
        next(error)
    }
    req.user =user
    next()
  })
   

  //! single role to delete
  const restrict= (role)=>{
    return (req,res,next)=>{
        if(req.user.role != role){
            const error = new CustomError('you dont have the permissin',403)
            next(error)
        }
        next()
    }
  }
  //! multiple role to delete
  const restrictMultipleRole= (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            const error = new CustomError('you dont have the permissin',403)
            next(error)
        }
        next()
    }
  }

  const forgetPassword = asyncErrorHandler(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        const error = new CustomError('we could not find the user,',404)
        next(error)
    }
    const resetToken =user.createResetPasswordToken()
    await user.save({validateBeforeSave:false})
    const resetUrl=`${req.protocol}://${req.get('host')}/api/users/resetPasswor/${resetToken}`
    //! htt://127.0.0.1.3000/api/users/resetPassword/122222 
    const message =`we have recieve a password reset please use the below link to rest your passt \n\n this reset passsword will be valid only minutes${resetUrl}`
    
    try {
        await sendEmail({
            email:user.email,
            subject:'passwoed change request recieved',
            message
        })
        res.status(200).json({
            status:'succes',
            message:'password reset link send to email'
        })
    } catch (error) {
        user.passwordResetToken=undefined
        user.passwordResetToken=undefined
        user.save({validateBeforeSave:false})
        return next( new CustomError('error in sending oassword reset email.please try again',500))
        
    }
     
  })
  const ResetPassword = asyncErrorHandler(async (req,res,next)=>{
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken:token,passwordTokenExpres:{$gte:Date.now( )}})
    if(!user){
        const error = new CustomError('error,token is invakid',400)
        next(error)
    }
    user.password=req.body.password
    user.confirmPassword=req.body.confirmPassword
    user.passwordResetToken=undefined
    user.passwordTokenExpres=undefined
    user.passwordChangeAt=Date.now()
    user.save() 

    const loginToken=signToken(user._id)
    res.status(200).json({
        status:'succes',
        token:loginToken
    })

})

module.exports={signup,login,Protect,restrict,forgetPassword,ResetPassword}