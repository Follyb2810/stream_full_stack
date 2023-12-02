const express = require('express')
const { route } = require('..')
const {signup, login, forgetPassword,ResetPassword} =require('./../controller/authControler')

const router= express.Router()


router.route('/sign').post(signup)
router.route('/login').post(login)
router.route('/forgetPassword').post(forgetPassword)
router.patch('/resetPassword/:token').post(ResetPassword)

module.exports = router