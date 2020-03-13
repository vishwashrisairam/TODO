import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Todos from './Todos';
import AddTodoItem from './AddTodoItem';
import DoneItems from './DoneItems';

const API_URL ="https://todo-noserver.herokuapp.com/";


class App extends Component {
  state = {
    todos:[],
    done :[]
  }

  componentDidMount(){
    
    const url = API_URL+"getTasks";
    
    axios.get(url).then(response =>{
      let todos = response.data.allTasks;
      let done = response.data.completedTasks;
      this.setState({todos,done });
    }); 
  }

  deleteTodo = (id) => {
    // console.log(id)

    const url = API_URL+"removeTask/"+id 
    axios.delete(url).then(response=>{
      let todos = response.data.allTasks;
      let done = response.data.completedTasks;
      this.setState({todos,done });
    });
    
  }

  addTodo = (todo) =>{
    const url = API_URL+"addTask";
    axios.post(url,{"item":todo.content}).then(response=>{
      console.log(response.data)  
      todo.id=response.data.id;
      todo.completed=response.data.completed;
      let todos = [...this.state.todos, todo];
      this.setState({todos});
    })
    

  }

  render(){
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo List</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <AddTodoItem add={this.addTodo}/>
        <DoneItems items ={this.state.done}/>
    </div>
    );
  }
}

export default App;
