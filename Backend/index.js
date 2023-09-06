import express from 'express'
import constant from './src/helpers/constant.js'

const app = express()

app.listen(constant.port,()=>{
    console.log(`Server is running on http://localhost:${constant.port}`)
})