
// import db from '../../helpers/constants.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from '../../config/dbconfig.js'
import user from '../../validation/users/users.js';
import constants from '../../helpers/constants.js';

const userlogin = async(req,res) => {

    // user.userValidate(req.body);

   

    try{

        const {username,email, password} = req.body;

        // let hashed;
        // await bcrypt.hash(password, 15).then(async (result) => {
        //     hashed = result;
        // });
        // console.log("new ",hashed)

        // const hash = bcrypt.hashSync('$2b$15$HdpzHTrxAUQ8pVABuyWhLejVhB2yVFOtVswbPJ3Eig.SPFSdmQYhG', 8);
        // console.log(hash)

        if (email) {

            const login = await knex('users')
                .select("user_id","username","email", "password")
                .where("email", email)
                .orWhere("username",username)
                .first();
            console.log(login)
                
            if (!login) {
                return res.status(401).json({ message: 'User not found' }).end();
            }

            if (!login.password) {
                return res.status(401).json({ message: 'User has no password' }).end();
            }

            const isPasswordValid = await bcrypt.compare(password, login.password);
            console.log(isPasswordValid)
            // if (!isPasswordValid) {
            //     return res.status(401).json({ message: 'Invalid password' });
            // }

            if (!isPasswordValid) {
                console.error('Input Password:', password);
                console.error('Hashed Password from Database:', login.password);
                return res.status(401).json({ message: 'Invalid password' });
              }

            const userdata = {
                id: login.user_id,
                username: login.username
            };

            const access = jwt.sign(
                { userdata, exp: Math.floor(Date.now() / 1000) + constants.accessToken.exp },
                constants.accessToken.secret
            );
            const refresh = jwt.sign(
                { userdata, exp: Math.floor(Date.now() / 1000) + constants.refreshToken.exp },
                constants.refreshToken.secret
            );

            return res.json({
                error: false,
                message: "Logged in successfully",
                accessToken: access,
                refreshToken: refresh
            }).end();
        }else {
            return res.status(401).json({ message: 'User not found' }).end();
        }
    

    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed' });
    }

    /*

    const { username, email, password } = req.body;

    if(email){
      const login = await knex("users")
      .select("user_id", "username", "password")
      .where("username", username)
      .orWhere("email", email);
    }
   
    const login = await knex("users")
    .select("user_id", "username", "password")
    .where("username", username)


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

    res.json({
      Error:false,
      Message:"Login successfull",
      Data:data,
      AccessToken :access,
      RefreshToken:refresh
    })

  } catch (error) {
    return res.json({
      Error: true,
      Message: error.message,
    });
  }*/
}



export default{
    userlogin
}