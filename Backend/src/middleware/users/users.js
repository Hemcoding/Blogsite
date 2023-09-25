const authLogin = (req,res,next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            message:"Authentication required"
        });
    }
    try{
        const decoded = jwt.verify(token,'R10#324367jdfhjI&eu@');
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(401).json({message:'Invalid token'});
    }
};

export default authLogin