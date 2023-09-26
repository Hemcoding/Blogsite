import knex from '../../config/dbconfig.js'
import comments from '../../validation/comments/comments.js'
import jwt from 'jsonwebtoken'
import constant from '../../helpers/constant.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const postComment = async(req,res)=>{
    try {
        const {error} =comments.checkComment.validate(req.body)
        if(error){
            return res.json({
                Error:true,
                Message:error.message
            })
         }

         const {comment , blog_id} = req.body

         const checkblog = await knex('blogs').select('*').where('blog_id',blog_id)
         if(checkblog.length == 0){
            return res.json({
                Error:false,
                Message:'Blog doesn\'t exist'
            })
         }

         const token = req.headers.authorization.split(" ")[1]
        // console.log(token)
         const Tokendata = jwt.verify(token, constant.accessToken.secret).data.id

         const username2 = await knex('users').select('username','profile_destination','profile_filename').where('user_id',Tokendata).andWhere('role_id',2)
         if(username2.length == 0){
            return res.json({
                Error:true,
                Message :'Invalid Credentials'
            })
         }
         const username = username2[0].username
         const image_destination = username2[0].profile_destination
         const image_filename = username2[0].profile_filename
         const data = {
            comment:comment,
            username:username,
            blog_id:blog_id,
            image_destination:image_destination,
            image_filename:image_filename,
            is_deletable:'YES'
         }

         const checkComment = await knex('comments').select('*').where('comment',comment).andWhere('username',username).andWhere('blog_id',blog_id)

         if(checkComment.length >=1){
            return res.json({
                Error : false,
                Message :"Comment already posted"
            })
         }
       
         const postComment = await knex('comments').insert(data)
            if(postComment.length == 0){
            return res.json({
                Error :false,
                Message:'failed to post comment'
            })
         }

         return res.json({
            Error:false,
            Message:'Comment has been posted',
            data:postComment
         })

    } catch (error) {
        return res.json({
            Error:true,
            Message:error.message
        })
    }
}

const getComment = async(req,res)=>{
    try {
        const {error} =  comments.getComment.validate(req.body)
        if(error){
            return res.json({
                Error:true,
                Message:error.message
            })
         }

         const {blog_id} = req.body

         const getComments = await knex('comments').select('comment_id','comment','username','image_destination','image_filename').where('blog_id',blog_id)

         if(getComments.length == 0){
            return res.json({
                Error : false,
                Message :'No comments on this blog'
            })
         }

         for(let i=0;i<getComments.length;i++){

            const image_filename = getComments[i].image_filename
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
             const imagePath = path.join(__dirname,'../../uploads/users',image_filename)
           if(fs.existsSync(imagePath)){
            const imageBinaryData = fs.readFileSync(imagePath)
    
            const imageBase64 = Buffer.from(imageBinaryData).toString('base64')
    
            getComments[i].image =imageBase64
            delete getComments[i].image_destination
            delete getComments[i].image_filename
           }
    
            }

         return res.json({
            Error:false,
            Message :'Comments has been fetched',
            Data:{
                Blogd_id:blog_id,
                comments:getComments
            }
         })


    } catch (error) {
        return res.json({
            Error:true,
            Message:error.message
        })
    }
}


export default {
    postComment,
    getComment
}