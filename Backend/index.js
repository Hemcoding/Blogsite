import express from "express"
import constants from './src/helpers/constants.js'
import users from "./src/routes/users/users.js"
import comment from './src/routes/comments/comment.js'
import categories from "./src/routes/categories/categories.js"


const app = express()

app.use(express.json())
    
app.use("/user",users.router)
app.use("/comments",comment.router)
app.use("/insertcategory",categories.router)

app.listen(constants.port,()=>{
    console.log(`Server is running on http://localhost:${constants.port}`)
})

// app.listen(8000,() => {
//     console.log(`Server is running on 8000`)
// })