import multer from "multer";
import nodemailer from 'nodemailer'
import constant from "../../helpers/constant.js";

// import test from '../../uploads/blogs'

//Local Storage access by multer for stroing user profile picture
 const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./src/uploads/users')
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})

//Transporter for sending mail 
const transporter = nodemailer.createTransport({
    service: constant.service ,
    auth:constant.auth,
  });

  //Password reset email with the help of Nodemailer
  const sendPasswordResetEmail = (email,resetToken) =>{
    //Mail Content
    const mailOptions = {
        from: constant.auth.user,
        to: email,
        subject: 'Password Reset',
        html: `
          <p>You requested a password reset for your account.</p>
          <p>Click the following link to reset your password:</p>
          <a href="http://10.201.1.195:8000/resetPassword?token=${resetToken}">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      };
    
      //sending email with the help of transponter
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  }

export default { 
    upload,
    sendPasswordResetEmail
} ;
