import knex from '../../config/dbconfig.js'
import constant from '../../helpers/constant.js'
import jwt from 'jsonwebtoken'
import blogs from '../../validation/blogs/blogs.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import formidable from 'formidable'
import blog from '../../middleware/blogs/blogs.js'

/*
const tempblog = async(req,res)=>{
    try {
        // blogs.verifyBlog.validateAsync(req.body)
        //  if(req.file == ""){
        //  console.log('please upload file first')
        //   return res.render('homepage')
        //  }
         const form = formidable({});
        
         // Parse the form data
      const [fields, files] = await form.parse(req)
     // console.log(files)
   
      let {title, description ,category} =fields

      const data2 = {
        title:title[0],
        description:description[0],
        category:category[0]
      }

     const {error} = await blogs.verifyBlog.validateAsync(data2)
     if(error){
        return res.status(404).json({
            Error:true,
            Message:error.message
        })
     }
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const Tokendata = jwt.verify(token, constant.accessToken.secret).data.id

        const {image} = files
        const checkBlog = await knex('blogs').select('*').where("title" ,'=',data2.title).andWhere("description",'=',data2.description)
     console.log(image)
        if(checkBlog.length >=1){
            return res.status(404).json({
                Error:false,
                Message:"Blog already exsits"
            })
        }
       
        const category_id = await knex('categories').select('category_id').where('name',data2.category)

        const data ={
            title:title,
            description:description,
            image:image[0].filepath,
            publish_date:new Date(),
            likes:0,
            dislikes:0,
            user_id: Tokendata,
            category_id:category_id[0].category_id,
            status:'YES'
        }
       blog.uploadWithCustomTemp.single(image[0])
       blog.uploadToFinalDestination.single(image[0])
        const insertedRows = await knex.insert(data).into('blogs')

        if(insertedRows.length == 0){
            return res.status(404).json({
                Error:false,
                Message :"Blog has not been inserted to database",
            })
        }
       
        res.status(200).json({
            Error:false,
            Message:"Blog has been inserted",
            Data:insertedRows
        })
        res.end()

    } catch (error) {
        return res.status(404).json({
            Error:true,
            Message:error.message
        }) 
    }
}
*/

const postBlog = async(req,res)=>{
    try {
      //  console.log(req.body)
        if(!req.file){
            return res.json({
                Error:true,
                Message:"Please upload the file"
            })
        }
        const {error} = blogs.verifyBlog.validate(req.body)
        if(error){
            return res.json({
                Error : true,
                Message:error.message
            })
        }

        const {title , description , category} = req.body 
        const {destination , filename} = req.file
      // console.log(category)
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
       const temp =  jwt.verify(token, constant.accessToken.secret).data
        const Tokendata = temp.id
        const Username = temp.username

        const checkBlog = await knex('blogs').select('*').where("title" ,'=',title).andWhere("description",'=',description)

        if(checkBlog.length >=1){
            return res.status(404).json({
                Error:false,
                Message:"Blog already exsits"
            })
        }
       
        const category_id = await knex('categories').select('category_id').where('name',category)
        if(category_id.length == 0){
            return res.status(404).json({
                Error:false,
                Message:"Category doesn't exsits"
            })
        }
        const data ={
            title:title,
            description:description,
            image_destination:destination,
            image_filename:filename,
            publish_date:new Date(),
            likes:0,
            dislikes:0,
            user_id: Tokendata,
            username:Username,
            category_id:category_id[0].category_id,
            category:category,
            status:'YES'
        }
       
        const insertedRows = await knex.insert(data).into('blogs')

        if(insertedRows.length == 0){
            return res.status(404).json({
                Error:false,
                Message :"Blog has not been inserted to database",
            })
        }
       
        res.status(200).json({
            Error:false,
            Message:"Blog has been inserted",
            Data:insertedRows
        })
        res.end()

    } catch (error) {
        return res.json({
           Error:true,
           Message:error.message
        })
    }
}

const fetchBlogs = async(req,res)=>{
    try {
        const {error} = blogs.fetchBlog.validate(req.body)
        if(error){
            return res.json({
                Error : true,
                Message:error.message
            })
        }

        const {offset} = req.body
        const blogs2 = await knex('blogs').select('blog_id','title','description','image_destination','image_filename','publish_date','category').limit(10).offset(offset*10).orderBy('blog_id','desc')

        if(blogs2.length == 0){
            return res.status(404).json({
                Error :true,
                Message :"No blogs to fetch"
            })
        }
       
        for(let i=0;i<blogs2.length;i++){

        const image_filename = blogs2[i].image_filename
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
         const imagePath = path.join(__dirname,'../../uploads/blogs',image_filename)
       if(fs.existsSync(imagePath)){
        const imageBinaryData = fs.readFileSync(imagePath)

        const imageBase64 = Buffer.from(imageBinaryData).toString('base64')

        blogs2[i].image =imageBase64
      
       }

        }
       
        return res.json({
            Error:false,
            Message:'Blogs has been fetched',
            Data:blogs2
        })
        // console.log(file)

      

    } catch (error) {
        return res.status(404).json({
            Error:true,
            Message:error.message
        })
    }
}

const fetchBlogsCategory = async(req,res)=>{
    try {
        
        const {error} = blogs.fetchBlogsCategory.validate(req.body)
        if(error){
            return res.json({
                Error : true,
                Message:error.message
            })
        }

        const {offset,category} = req.body
        const category_id2 = await knex('categories').select('category_id').where('name',category)
        const category_id = category_id2[0].category_id
        const blogs2 = await knex('blogs').select('blog_id','title','description','image_destination','image_filename','publish_date','likes','dislikes','username','category').where('category_id',category_id).limit(10).offset(offset*10).orderBy('blog_id','desc')

        if(blogs2.length == 0){
            return res.status(404).json({
                Error :true,
                Message :"No blogs to fetch"
            })
        }
       
        for(let i=0;i<blogs2.length;i++){

            const image_filename = blogs2[i].image_filename
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
         const imagePath = path.join(__dirname,'../../uploads/blogs',image_filename)
       if(fs.existsSync(imagePath)){
        const imageBinaryData = fs.readFileSync(imagePath)

        const imageBase64 = Buffer.from(imageBinaryData).toString('base64')

        blogs2[i].image =imageBase64
      
       }

        }
       
        return res.json({
            Error:false,
            Message:'Blogs has been fetched',
            Data:blogs2
        })
        // console.log(file)

    } catch (error) {
        return res.status(404).json({
            Error:true,
            Message:error.message
        })
    }
}

const likes = async(req,res)=>{
    try {
        const {error} = blogs.likes.validate(req.body)
        if(error){
            return res.json({
                Error : true,
                Message:error.message
            })
        }

        const {blog_id,like} = req.body
        const checkblog = await knex('blogs').select('*').where('blog_id',blog_id)
        if(checkblog.length == 0){
           return res.json({
               Error:false,
               Message:'Blog doesn\'t exist'
           })
        }

        const oldlikes = await knex('blogs').select('likes').where('blog_id',blog_id)
        if(oldlikes[0].likes == 0 && like == -1){
            return res.json({
                Error:false,
                Message :"Likes has been updated"
            })
        }
      const liked = await knex('blogs').update('likes',oldlikes[0].likes + like).where('blog_id',blog_id)
      
      if(liked.length == 0 ){
        return res.json({
            Error : true,
            Message:'No likes'
        })
      }

      return res.json({
        Error:false,
        Message:'Likes has been updated',
        Likes :oldlikes[0].likes + like
      })
    } catch (error) {
        return res.json({
            Error:true,
            Message:error.message
        })
    }
}

const dislikes = async(req,res)=>{
    try {
        const {error} = blogs.dislikes.validate(req.body)
        if(error){
            return res.json({
                Error : true,
                Message:error.message
            })
        }

        const {blog_id,dislike} = req.body
        const checkblog = await knex('blogs').select('*').where('blog_id',blog_id)
        if(checkblog.length == 0){
           return res.json({
               Error:false,
               Message:'Blog doesn\'t exist'
           })
        }

        const olddislikes = await knex('blogs').select('dislikes').where('blog_id',blog_id)
        if(olddislikes[0].dislikes == 0 && dislike == -1){
            return res.json({
                Error:false,
                Message :"Dislikes has been updated"
            })
        }
      const disliked = await knex('blogs').update('dislikes',olddislikes[0].dislikes + dislike).where('blog_id',blog_id)
      
      if(disliked.length == 0 ){
        return res.json({
            Error : true,
            Message:'No Dislikes'
        })
      }

      return res.json({
        Error:false,
        Message:'Dislikes has been updated',
        Dislikes :olddislikes[0].dislikes + dislike
      })
    } catch (error) {
        return res.json({
            Error:true,
            Message:error.message
        })
    }
}

const deleteBlog = async(req,res)=>{
   try {
    const {error} = blogs.deleteBlog.validate(req.body)
    if(error){
        return res.json({
            Error : true,
            Message:error.message
        })
    }
     const {blog_id} = req.body

     const token = req.headers.authorization.split(" ")[1]

     // console.log(token)

     const temp =  jwt.verify(token, constant.accessToken.secret).data

      const Tokendata = temp.id

      const Username = temp.username

     const blogs2 = await knex('blogs').select('blog_id','image_destination','image_filename').where('blog_id',blog_id).andWhere('user_id',Tokendata).andWhere('username',Username)
        if(blogs2.length == 0){
            return res.json({
                Error:false,
                Message:"blog doesn't exsits "
            }) 
        }

     const deletedBlogs = await knex('blogs').delete().where('blog_id',blog_id)
     if(deletedBlogs == 0){
        return res.json({
            Error:false,
            Message:"failed to delete blog "
        })
     }

     const deleteComments = await knex('comments').delete().where('blog_id',blog_id)

     const filepath = blogs2[0].image_destination +'/' + blogs2[0].image_filename
     if (fs.existsSync(filepath)) {
        // File exists, delete it
        console.log(filepath)
        fs.unlink(filepath, (err) => {
          if (err) {
            // Handle the error (e.g., log or respond with an error message)
            console.error('Error deleting file:', err);
          } else {
            // File has been successfully deleted
            console.log('File deleted successfully');
          }
        });
      }

     return res.json({
        Error:false,
        Message:'Blog and comments are deleted',
        Data :{
            Deleted_Blogs:deletedBlogs,
            Deleted_comments:deleteComments
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
    postBlog,
    fetchBlogs,
    likes,
    dislikes,
    fetchBlogsCategory,
    deleteBlog
}