const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const passport=require('passport');
const session=require('express-session');
const mongoconnect=require('connect-mongo');

const method_override=require('method-override');
const dotenv=require('dotenv');
dotenv.config({path: './config/config.env'})
const routes=require('./routes/router');
const MongoStore = require('connect-mongo');




app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));




require('./config/passport')(passport);

//method Override

app.use(method_override(function(req,res){
    if(req.body && typeof req.body==='object' && '_method' in req.body){
        let method=req.body._method
        delete req.body._method
        return method
    }
}))

//Session

app.use(session({
    secret:"nodejs",
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl:process.env.DB
    })
    
    
}))

app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
    res.locals.username=req.user;
    next();
})

app.use(routes);



// MongoDB connection
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
});

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("Connected");
});


const PORt=process.env.PORT;
app.listen(PORt,()=>{
    console.log(`Server started at ${PORt}`);

})


