const nodemailer = require('nodemailer')

const sendEmail= async(option)=>{ 
    const transporter = nodemailer.createTransport({
        // host:'Gmail'
        host:process.env.Email_Host,
        port:process.env.Email_Port,
        auth:{
            user:process.env.Email_User,
            pass:process.env.Email_Password
        }
    }) 

    const emailOptions={
        from :'folly support<support@folly.com>',
        to:option.email,
        subject:option.subject,
        text:option.message
    }
    await transporter.sendEmail(emailOptions)
}


module.exports=sendEmail