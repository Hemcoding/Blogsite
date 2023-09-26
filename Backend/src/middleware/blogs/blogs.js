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

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
        const error = new Error('Not an image! Please upload an image.');
        req.error = error
        cb(null, false);
    }

    
  };

 const upload = multer({storage:storage , fileFilter:imageFilter})
 

export default { 
    upload
} ;
