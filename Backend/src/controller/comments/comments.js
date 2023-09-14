import knex from '../../config/dbconfig.js'
import comments from '../../validation/comments/comments.js'
import jwt from 'jsonwebtoken'
import constant from '../../helpers/constant.js'

const postComment = async(req,res)=>{
    try {
        const {error} =comments.checkComment.validateAsync(req.body)
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

         const username2 = await knex('users').select('username').where('user_id',Tokendata)
         const username = username2[0].username
         const data = {
            comment:comment,
            username:username,
            blog_id:blog_id,
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

         const getComments = await knex('comments').select('comment_id','comment','username').where('blog_id',blog_id)

         if(getComments.length == 0){
            return res.json({
                Error : false,
                Message :'No comments on this blog'
            })
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