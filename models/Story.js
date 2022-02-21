const mongoose=require('mongoose');

const StorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:"Public",
        enum:['Public','Private']
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
   
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model('Story',StorySchema)