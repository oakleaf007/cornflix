export const auth = function(req,res,next){
    const adminPassword = req.headers["admin-password"];
    if(adminPassword === "myAdminPass"){
        next();
    }else{
        res.status(401).json({message: "Unauthorized"});
    }
};