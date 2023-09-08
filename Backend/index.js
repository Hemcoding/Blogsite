import express from 'express'
import constant from './src/helpers/constant.js'
import knex from './src/config/dbconfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(constant.port,()=>{
    console.log(`Server is running on http://localhost:${constant.port}`)
})