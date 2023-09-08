import knex from "../config/dbconfig.js"
import user from '../validation/users.js'

const registerUser = async(req,res)=>{
  try {
      user.signUp.validateAsync(req.body)

      const {
        username , password , firstname , lastname , email , mobileno , role
      } = req.body

      const roles = await knex('roles').select('role_id').where('name',role);

      if(!roles){
        return res.json({
            Error:true,
            Message:"Please provide proper role"
        })
      }

      const data = {
        username :username,
        password:password,
        first_name:firstname,
        last_name:lastname,
        email:email,
        mobile_no:mobileno,
        status:'NO',
        role :roles.role_id
      }

      const insertedRows = await knex('users').insert(data)

      if(!insertedRows){
        return res.json({
            Error:true,
            Message:"NO data has been inserted"
        })
      }

      res.json({
        Error:false,
        Message:"Data has been inserted"
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