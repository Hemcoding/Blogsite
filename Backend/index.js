import express from 'express'
import constant from './src/helpers/constant.js'
import users from './src/routes/users/users.js'
import roles from './src/routes/roles/roles.js'
import categories from './src/routes/categories/categories.js'
import blogs from './src/routes/blogs/blogs.js'
import comments from './src/routes/comments/comments.js'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(express.static('js'));

app.use('/users',users.router)
app.use('/roles',roles.router)
app.use('/categories',categories.router)
app.use('/blogs',blogs.router)
app.use('/comments',comments.router)
app.set('view engine','ejs')
app.set('views',path.resolve('./src/views'))

app.get('/blogs',async(req,res)=>{
    res.render('blogs/postBlog.ejs')
})

app.listen(constant.port,()=>{
    console.log(`Server is running on http://localhost:${constant.port}`)
})