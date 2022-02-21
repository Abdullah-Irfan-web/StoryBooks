const express=require('express');
const router=express.Router();
const passport=require('passport')
const moment=require('moment')


const {ensureAuth,ensureLogin}=require('../Auth/Authenticate')

const Story=require('../models/Story');

// Authentication








router.get('/',(req,res)=>{
   res.redirect('/login');
})
router.get('/login',ensureLogin,(req,res)=>{
    res.render('login')
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login')
})

router.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),
(req,res)=>{
    res.redirect('/dashboard');
}
)
router.get('/dashboard',ensureAuth,(req,res)=>{
    Story.find({user:req.user.id}).sort({createdAt:'desc'})
    .then(stories=>{
        res.render('dashboard',{story:stories,moment:moment})
    })
    
       
   
  
   
})
router.get('/addstory',ensureAuth,(req,res)=>{
    res.render('story');
})

router.get('/publicstory',ensureAuth,(req,res)=>{
    Story.find({status:'Public'})
    .then(story=>{
        res.render('public',{stories:story})
    })
    .catch(err=>{
        res.send("Error 404 cannot get Stories")
    })
    
})

router.get('/edit/:id',(req,res)=>{
    Story.findOne({_id:req.params.id})
    .then(story=>{
        res.render('edit',{story:story})
    })
})

router.post('/story',(req,res)=>{
    req.body.image=req.user.image;
    req.body.firstName=req.user.firstname;
    req.body.lastName=req.user.lastname;
    req.body.user=req.user.id;
  Story.create(req.body)
  .then(Stories=>{
      res.redirect('/dashboard');
  })
  .catch(err=>{
      res.send("Error 404");
  })
    

})
router.get('/delete/:id',(req,res)=>{
    Story.findOneAndDelete({_id:req.params.id})
    .then(deletedstory=>{
        res.redirect('/dashboard')
    })
})

router.put('/update/:id',(req,res)=>{
    Story.findOneAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidators: true
    })
    .then(updatestory=>{
        res.redirect('/dashboard')
    })
})

module.exports=router;