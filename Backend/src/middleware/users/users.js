import multer from "multer";
// import test from '../../uploads/blogs'

 const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./src/uploads/users')
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

 const upload = multer({storage:storage})

export default { 
    upload
} ;
