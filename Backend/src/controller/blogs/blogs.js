import knex from '../../config/dbconfig.js'
import blogs from '../../validation/blogs/blogs.js'

const postBlog = async(req,res)=>{
    try {
        blogs.verifyBlog.validateAsync(req.body)
        const {title, description ,category_id} = req.body

        const checkBlog = await knex('blogs').select('*').where("title" ,'=',title).andWhere("description",'=',description)

        if(checkBlog.length >=1){
            return res.json({
                Error:false,
                Message:"Blog already exsits"
            })
        }
       
        const data ={
            title:title,
            description:description,
            image:'path of image',
            publish_date:new Date(),
            likes:0,
            dislikes:0,
            user_id: 1,
            category_id:category_id,
            status:'YES'
        }

        const insertedRows = await knex.insert(data).into('blogs')

        if(insertedRows.length ==0){
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