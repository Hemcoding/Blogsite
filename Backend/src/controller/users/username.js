import knex from '../../config/dbconfig.js'

const checkUsername =async(username) =>{
    
const  checkUname= await knex('users').select('user_id').where('username',username)

if(checkUname.length == 0){
  return "Username Available"
}

return "Username Unavailable"

}

export default checkUsername