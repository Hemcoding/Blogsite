const port = 8000
const saltRounds = 15
const dbconfig ={
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    database:"blogsite"
}

export default {
    port,
    dbconfig,
    saltRounds
}