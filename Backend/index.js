import express from 'express'
import constant from './src/helpers/constant.js'
import users from './src/routes/users/users.js'
import roles from './src/routes/roles/roles.js'
import categories from './src/routes/categories/categories.js'
import blogs from './src/routes/blogs/blogs.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/users',users.router)
app.use('/roles',roles.router)
app.use('/categories',categories.router)
app.use('/blogs',blogs.router)

app.listen(constant.port,()=>{
    console.log(`Server is running on http://localhost:${constant.port}`)
})