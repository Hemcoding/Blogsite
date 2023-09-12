import knex from '../../config/dbconfig.js'
import blog from '../../middleware/blogs/blogs.js'
import constant from '../../helpers/constant.js'
import formidable from 'formidable'
import jwt from 'jsonwebtoken'

const postBlog = async(req,res)=>{
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
      const formData = {
        fields:fields,
        files:files
      }
        const token = req.headers.authorization.split(" ")[1]
       console.log(token)
        const Tokendata = jwt.verify(token, constant.accessToken.secret).data.id

        const {title, description ,category} = formData.fields
        const {image} = formData.files
        const checkBlog = await knex('blogs').select('*').where("title" ,'=',title[0]).andWhere("description",'=',description[0])

        if(checkBlog.length >=1){
            return res.json({
                Error:false,
                Message:"Blog already exsits"
            })
        }
       
        const category_id = await knex('categories').select('category_id').where('name',category[0])

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
       blog.upload.single(image[0])
        const insertedRows = await knex.insert(data).into('blogs')

        if(insertedRows.length == 0){
            return res.json({
                Error:false,
                Message :"Blog has not been inserted to database",
            })
        }
       
        res.json({
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

export default {
    postBlog
}