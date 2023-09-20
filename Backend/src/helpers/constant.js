//Port number
const port = 8000;

//Salt rounds for hashing password
const saltRounds = 15;

//Database configuration for Knex
const dbconfig = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "blogsite",
};

//Access token secret and expiry time
const accessToken = {
  exp: 1 * 60000,
  secret: "02c79048bc7e055385655953f5aa6e109ee92ebd15f683ca7fd9cfc6fed5985b",
};

//Refresh token secret and expiry time
const refreshToken = {
  exp: 1 * 90000,
  secret: "731e4b0af71aa1583d6dbf369171dbb729a6488da346ed17d63a6984a904971a",
};

//Secret for token of reset email
const resetToken = '5880df3c2e37bedb3f7fcc8c2ac57c76ac2cfa325d0128385866f829f359a842'

//Node Mailer Configurations
const service = 'Gmail'
const auth =  {
  user: 'blogsite771@gmail.com', // Your Gmail email address
  pass: 'pdos bzar pyye oxbx',  // Your Gmail password
}
export default {
  port,
  dbconfig,
  saltRounds,
  accessToken,
  refreshToken,
  service,
  auth,
  resetToken
};
