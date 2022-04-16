let mongoose=require('mongoose');
//UserSchema
let UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    registered:{
        type:Date,
        default:new Date()
    },
    password:{
        type:String,
        required:true
    },
    tasks:{
        type:[{deadline:Date,taskDescription:String}]
    }
});
let User=module.exports=mongoose.model('User',UserSchema);