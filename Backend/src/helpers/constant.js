const port = 8000;

const saltRounds = 15;

const dbconfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "blogsite",
};

const accessToken = {
  exp: 1 * 60000,
  secret: "02c79048bc7e055385655953f5aa6e109ee92ebd15f683ca7fd9cfc6fed5985b",
};

const refreshToken = {
  exp: 1 * 90000,
  secret: "731e4b0af71aa1583d6dbf369171dbb729a6488da346ed17d63a6984a904971a",
};

const resetToken = '5880df3c2e37bedb3f7fcc8c2ac57c76ac2cfa325d0128385866f829f359a842'
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
