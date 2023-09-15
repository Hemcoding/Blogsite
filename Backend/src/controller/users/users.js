import knex from "../../config/dbconfig.js";
import user from "../../validation/users/users.js";
import checkUsername from "./username.js";
import bcrypt from "bcrypt";
import constant from "../../helpers/constant.js";
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
  try {
   const {error} =  user.signUp.validate(req.body);
   if(error){
    return res.json({
        Error:true,
        Message:error.message
    })
 }
    const { username, password, firstname, lastname, email, mobileno, role } = req.body;

    const roles = await knex("roles")
      .select("role_id")
      .where("name", "=", role);

    if (!roles) {
      return res.json({
        Error: true,
        Message: "Please provide proper role",
      });
    }
    if ( await checkUsername(username, email) == "Username or Email Unavailable" ) {
      return res.json({
        Error: true,
        Message: "Username or email already exsits",
      });
    }

    let hashed;
    await bcrypt.hash(password, constant.saltRounds).then(async (result) => {
      hashed = result;
    });

    const data = {
      username: username.toLowerCase().trim(),
      password: hashed,
      first_name: firstname.charAt(0).toUpperCase() + firstname.slice(1).trim(),
      last_name: lastname.charAt(0).toUpperCase() + lastname.slice(1).trim(),
      email: email,
      mobile_no: mobileno,
      status: "NO",
      role_id: roles[0].role_id,
    };

    const insertedRows = await knex("users").insert(data);

    if (insertedRows.length >= 1) {
      return res.json({
        Error: false,
        Message: "Data has been inserted",
        Data : insertedRows
      });
    }

   return res.json({
      Error: true,
      Message: "NO data has been inserted",
    });
  } catch (error) {
    return res.json({
      Error: true,
      Message: "aa j chhe",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const {error} = user.login.validate(req.body)
    if(error){
      return res.json({
        Error:true,
        Message:error.message
    })
    }
    const { email, password } = req.body;
   // console.log(email , password)
   // let login;
  //  if(email){
   const login = await knex("users")
      .select("user_id", "username", "password","first_name","last_name","mobile_no")
      .where("username", email)
      .orWhere("email", email);
    //}
  // else{
   
  // }
  
    const auth = await bcrypt.compare(password, login[0].password);

    if (auth != true) {
      return res.json({
        Error: false,
        Message: "Invalid credentials",
      });
    }

    const data = {
      id:login[0].user_id,
      username:login[0].username
    }

    const access = jwt.sign(
      { 
        data,
        exp: Math.floor(Date.now() / 1000) + constant.accessToken.exp 
      },
      constant.accessToken.secret
    );
    const refresh = jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + constant.refreshToken.exp,
      },
      constant.refreshToken.secret
    );

    const response = {
      id:login[0].user_id,
      username:login[0].username,
      first_name:login[0].first_name,
      last_name:login[0].last_name,
      mobile_no:login[0].mobile_no,
      email:email
    }

    res.json({
      Error:false,
      Message:"Login successfull",
      Data:response,
      AccessToken :access,
      RefreshToken:refresh
    })

  } catch (error) {
    return res.json({
      Error: true,
      Message: error.message,
    });
  }
};

export default {
  registerUser,
  userLogin
};
