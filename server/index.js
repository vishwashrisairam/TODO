const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.json())

// Mongo DB Connection with mongoose
const DB_CONNECT = "mongodb+srv://todoAdmin:todoPassword@testcluster-xxagk.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const todo = require('./todoObject');
mongoose.set("useFindAndModify", false);
var options = { useNewUrlParser: true,
                server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect(DB_CONNECT,options, () => {
    console.log("Connected to db!");
    app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

});


//the task array with initial placeholders for added task
let tasks = [
    {id:1,content:'buy milk',completed:false},
    {id:2, content: 'meeting at 4',completed:false}
];

let completedTasks =[];

app.post('/addtask',(req,res)=>{
    var newTask = {
        id:Math.random(),
        content:req.body.item,
        completed:false
    };
    tasks.push(newTask);
    res.json(newTask);
});

app.get('/getTasks',(req,res)=>{

    let response ={};
    response['allTasks'] = tasks;
    response['completedTasks']=completedTasks;
    res.json(response);
})

app.delete('/removeTask/:id',(req,res)=>{
    let id = req.params.id;
    let deletedTask = tasks.filter(x=> x.id ==id);
    let remainingTasks = tasks.filter (x => {
        return x.id != id ;  
    });  
    tasks = remainingTasks;
    if(deletedTask.length > 0){
        deletedTask[0].completed=true;
        completedTasks.push(deletedTask[0]);
    }else{
        res.send('Task not found in Db');
    } 
    let response ={};
    response['allTasks'] = tasks;
    response['completedTasks']=completedTasks;
    res.json(response);
});

app.get('/test', (req, res) => {
    res.send('Hello World!');
})

// app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


// Mongo DB APIs Test

app.post('/newTask',(req,res)=>{
    // let taskid = Math.random()
    let compl = false;
    let task = {
        // id:taskid,
        content:req.body.item,
        completed:compl
    };
    // const newTask = new todo(task);
    try{
        todo.create(task).then(result=>{
            // console.log(result);
            res.send(result);
        })
       

    }catch(err){
        res.send(err);
    }
});

app.get('/todos',(req,res)=>{
    todo.find({},(err,todos)=>{
        if(err){
            // console.log(err)
            res.send(err)
        }else{

            
            // console.log(todos)
            let tasks = todos.filter(x=> x.completed === false);
            let completedTasks = todos.filter(x=>x.completed === true);

            let response ={};
            response['allTasks'] = tasks;
            response['completedTasks']=completedTasks;
            res.json(response);
        }
    })
});

app.delete('/complete/:id',(req,res)=>{
    let id = req.params.id;
    todo.findByIdAndUpdate(id,{completed:true},err=>{
        if(err){
            res.send(err);
        }else{
            // res.redirect('/todos')
            todo.find({},(err,todos)=>{
                if(err){                    
                    res.send(err)
                }else{
                    // console.log(todos)
                    let tasks = todos.filter(x=> x.completed === false);
                    let completedTasks = todos.filter(x=>x.completed === true);
        
                    let response ={};
                    response['allTasks'] = tasks;
                    response['completedTasks']=completedTasks;
                    res.json(response);
                }
            })
        }
        
        
    })

});