import multer from "multer";
// import test from '../../uploads/blogs'

//Accessing localStorage by Multer for Image storing
 const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./src/uploads/blogs')
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

 const upload = multer({storage:storage})

export default { 
    upload
} ;
