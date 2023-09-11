import knex from "../../config/dbconfig.js"
import user from '../../validation/users/users.js'
import checkUsername from "./username.js"
import bcrypt from "bcrypt"
import constant from "../../helpers/constant.js"

const registerUser = async(req,res)=>{
  try {
      user.signUp.validate(req.body)

      const {
        username , password , firstname , lastname , email , mobileno , role
      } = req.body

      const roles = await knex('roles').select('role_id').where('name','=',role);

      if(!roles){
        return res.json({
            Error:true,
            Message:"Please provide proper role"
        })
      }
      if(await checkUsername(username) =="Username Unavailable"){
        return res.json({
            Error:true,
            Message:"Username Unavailable"
        })
      }

      let hashed
    await bcrypt.hash(password ,constant.saltRounds).then(async(result)=>{
         hashed = result
     });

      const data = {
        username :username.toLowerCase().trim(),
        password:hashed,
        first_name:firstname.charAt(0).toUpperCase() + firstname.slice(1).trim(),
        last_name:lastname.charAt(0).toUpperCase() + lastname.slice(1).trim(),
        email:email,
        mobile_no:mobileno,
        status:'NO',
        role_id :roles[0].role_id
      }

      const insertedRows = await knex('users').insert(data)

      if(insertedRows.length >= 1){
        return res.json({
          Error:false,
          Message:"Data has been inserted"
        })
      }

      res.json({
        Error:true,
        Message:"NO data has been inserted"
    })

     
  } catch (error) {
    return res.json({
        Error:true,
        Message:error.message
    })
  }
}

export default {
    registerUser
}