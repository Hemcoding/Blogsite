import knex from '../../config/dbconfig.js'

const checkUsername =async(username,email) =>{
    
const  checkUname= await knex('users').select('user_id').where('username',username).orWhere('email',email)

if(checkUname.length == 0){
  return "Username or Email Available"
}

return "Username or Email Unavailable"

}

export default checkUsername