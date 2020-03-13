const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.json())


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

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))