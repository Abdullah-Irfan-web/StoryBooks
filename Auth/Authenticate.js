module.exports={
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/login');
        }
    },
    ensureLogin: function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        }
        else{
            return next();
        }
    }
}