const port = 8000
 let BASE_URL = `http://localhost:${port}`

let dbconfig = {
    host: "127.0.0.1",
    user: "root",
    port : "",
    password: "",
    database: "Blogsite",
}
const accessToken = {
    exp: 60000,
    secret: "R10#324367jdfhjI&eu@"
}

const refreshToken = {
    exp: 12000,
    secret: "R10#324367jdfhjI&eu@"
}
export default{
    port,
    dbconfig,
    BASE_URL,
    accessToken,
    refreshToken
}