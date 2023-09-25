import knex from "../../config/dbconfig.js";
import jwt from "jsonwebtoken";
import constants from "../../helpers/constants.js";
import validation from "../../validation/comments/comment.js"


const postComment = async(req,res) => {

  try{

    const {error} = validation.postvalidateComment.validate(req.body);
    if(error){
      return res.status(400).json({message: error.message});
    }
    const {comment, blog_id} = req.body;
    const token = req.header('Authorization').split(' ')[1];
    if(!token){
      return res.status(401).json({message:'Authorization required'})
    }
    try{
      
     // const {comment, blog_id} = req.body;
 
     const blog = await knex('blogs')
     .select("*")
     .where("blog_id",blog_id)
     .first();
 
     if(!blog){
       return res.status(400).json({message:"Blog does not exists"})
     }
 
    
     const decoded = jwt.verify(token,constants.accessToken.secret).userdata.id;
     console.log(decoded)
 
     const user = await knex('users')
     .select('username')
     .where('user_id',decoded)
     .first();
     console.log(user)
     // const userId = user_id.tokendata  ;
     const username = user.username;
     // console.log(userId);
     console.log(username);
 
     // const user = await knex('users')
     // .select('username')
     // .where('user_id',userId)
     // .first();
 
     const data = {
       comment,
       username,
       blog_id,
       is_deletable: 'yes',
     }
 
     const comments = await knex('comments')
     .select('comment')
     .where('blog_id',blog_id)
     .andWhere('username',username)
     .andWhere('comment',comment)
     .first();
 
     if(comments){
       return res.status(400).json({ message: "User has already posted the comment" });
     }
 
     const addComment = await knex('comments').insert(data)
 
     return res.status(201).json({ message: "Comment posted successfully.." });
 
 
   }catch(err){
 
     console.error('Post comment error:', err);
     return res.status(401).json({ message: 'Invalid token' });
   }
  } catch(error){
    return res.status(400).json({ error:true  ,message: err.message });
  }
  // const {comment, blog_id} = req.body;

}

const getComment = async(req,res)=>{

  try{
    const{error}= validation.getvalidateComment.validate(req.body);

    if(error){
      return res.json({
        Error:true,
        Message: error.message
      })
    }
    const {blog_id}=req.body
    const commentGet = await knex('comments')
    .select('comment_id','comment','username')
    .where('blog_id',blog_id)

    if(commentGet.length==0)
    {
      req.json({
        Error: false,
        Message: 'Comments are not available.'
      })
    }
    const allcomment = res.json({
      blog_id:blog_id,
      comment:commentGet
    })
  }catch{

  }
}

export default {
  postComment,
  getComment
}