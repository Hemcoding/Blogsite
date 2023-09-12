import knex from '../../config/dbconfig.js'
import categories from '../../validation/categories/categories.js'
import category from '../../middleware/categories/categories.js'

const addCategory = async(req,res)=>{
    try {
        categories.verifyCategory.validateAsync(req.body)

        const {name} = req.body

        const checkCategory = await knex('categories').select('name').where('name',name)

        if(checkCategory.length >=1){
            return res.json({
                Error:false,
                Message :"Category already exsits"
            })
        }

        console.log(category.formatCategory(name))
        const data = {
            name:category.formatCategory(name),
            status:'YES'
        }

        const insertedRows = await knex.insert(data).into('categories')

        if(insertedRows.length == 0){
            return res.json({
                Error : false,
                Message :"No data has been insert"
            })
        }

        res.json({
            Error :false,
            Message:"Data has been inserted",
            Data:insertedRows
        })

    } catch (error) {
       return res.json({
            Error:true,
            Message:error.message
        })
    }
}

const showCategories = async(req,res)=>{
    try {
        const data = await knex('categories').select('category_id','name').where('status','YES')

        if(data.length == 0){
            return res.json({
                Error:false ,
                Message :"No data"
            })
        }

        res.json({
            Error:false,
            Message:"Data has been fetched",
            Data :data
        })

    } catch (error) {
      return res.json({
            Error:true,
            Message:error.message
        }) 
    }
}

export default {
    addCategory,
    showCategories
}