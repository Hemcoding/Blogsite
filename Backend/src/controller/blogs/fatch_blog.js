import knex from "../../config/dbconfig.js"
import constants from "../../helpers/constants.js"
import valid from "../../validation/categories/categories.js"


// Function to insert data into the database
const insertcategory = async(req,res) => {
    try {
      
      const {name} = req.body;  
        const category = await knex('categories')
        .select("name")
        .where("name",name)
        .first();
    
        if(category){
          return res.status(400).json({ message: "Category already existed" });
        }
          
      const {error} = valid.categories.validate(req.body);
    
      if(error){
  
          return res.status(400).json({message: error.message});
      }           
      const data = {
          name
        }
      const addComment = await knex('categories').insert(data)
   
      console.log('Category inserted successfully.');
      return res.status(201).json({ message: "Category added successfully.." });
    } catch (error) {
      console.error('Error inserting category:', error);
    }
  }
  
  const allcategory = async(req,res)=>{
  
      try{
       
        const categoryall = await knex('categories')
        .select('name')
  
        const namesofcategory = res.json({
          name:categoryall
        })
      }catch (error) {
              console.error('Error inserting category:', error);
      }
    }
  
  export default {
  insertcategory,
  allcategory
  }