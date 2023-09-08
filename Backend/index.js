import express from 'express'
import constant from './src/helpers/constant.js'
import users from './src/routes/users.js'
import roles from './src/routes/roles.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/users',users.router)
app.use('/roles',roles.router)

app.listen(constant.port,()=>{
    console.log(`Server is running on http://localhost:${constant.port}`)
})