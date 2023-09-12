const port = 8000;
const saltRounds = 15;
const dbconfig = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "blogsite",
};

const accessToken = {
  exp: 1 * 60,
  secret: "02c79048bc7e055385655953f5aa6e109ee92ebd15f683ca7fd9cfc6fed5985b",
};

const refreshToken = {
  exp: 1 * 90,
  secret: "731e4b0af71aa1583d6dbf369171dbb729a6488da346ed17d63a6984a904971a",
};

export default {
  port,
  dbconfig,
  saltRounds,
  accessToken,
  refreshToken,
};
