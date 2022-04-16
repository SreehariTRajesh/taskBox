const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/userdatabase');
let db=mongoose.connection;
db.once('open',function(){
    console.log('Connected to MongoDB');
})
db.on('error',function(err){
    console.log(err);
});

let User=require('./models/user');
app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/user-database',function(req,res){
    User.find({},function(err,users){
        if(err){
            console.log(err);
        }
        else{
            res.render('user-data',{
               users:users
            });
        }
    }); 
});
app.get('/',function(req,res){
    res.render('home-page');
});
app.get('/:id/dashboard',function(req,res){
    let id=req.params.id;
    User.find({_id:id},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('user-page',{id:data[0]._id.toString(),name:data[0].name.toString(),tasks:data[0].tasks});
        }
    });
});
app.get('/login',function(req,res){
    res.render('login');
});

app.post('/login',function(req,res){
    var x=req.body.username;
    var y=req.body.password;
    User.find({username:x,password:y},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            if(data.length!=0){
                console.log(data[0]._id); res.redirect('/'+data[0]._id.toString()+'/dashboard');
            }
            else{
                console.log('User not found...');
                res.status(404).send();
            }
        }
    });
});
app.get('/sign-up',function(req,res){
    res.render('register'); 
});
app.post('/sign-up',function(req,res){
   let usermodel=new User();
   usermodel.username=req.body.username;
   usermodel.name=req.body.name;
   usermodel.email=req.body.mail;
   usermodel.phoneno=req.body.phno;
   usermodel.password=req.body.pw;
   usermodel.registered=new Date();
   usermodel.save(function(err){
       if(err){
           console.log(err);
       }
       else{
           console.log('article saved successfully');
           res.redirect('/user-database');
       }
   });
});
app.get('/:id/add-task',function(req,res){
    var id=req.params.id;
    res.render('add-task',{id:id});
});
app.post('/:id/add-task',function(req,res){
    var id=req.params.id;
    var date=req.body.deadline;
    var task=req.body.description;
    var obj={
        deadline:date,
        taskDescription:task
    }
    User.findOneAndUpdate({_id:req.params.id},{$push:{tasks:[obj]}},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    });
    console.log('Article saved successfully...');
    res.redirect(`/${id}/dashboard`);
});
app.get('/:id/view-task',function(req,res){
    User.find({_id:req.params.id},function(err,data){
        if(err){
            console.log(err);
        } 
        else{
            res.render('view-task',{tasks:data[0].tasks,id:req.params.id});
        }
    });
})
app.listen(3000,function(){
    console.log('Server up and running at http://localhost:3000\n');
});