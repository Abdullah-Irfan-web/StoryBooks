const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');

const User=require('../models/User');

module.exports=function(passport){
    passport.use(new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
   

    },
    async (accessToken, refreshToken,profile,done)=>{
        const newuser={
            googleID:profile.id,
            displayname:profile.displayName,
            firstname:profile.name.givenName,
            lastname:profile.name.familyName,
            image:profile.photos[0].value
            

        }
        User.findOne({googleID:profile.id})
        .then(user=>{
            if(user){
                done(null,user)
            }
            else{
                User.create(newuser)
                .then(userr=>{
                    done(null,userr)
                })
            }
        }).catch(err=>{
            console.log(err);
        })
       
    }
    ))
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    });
}