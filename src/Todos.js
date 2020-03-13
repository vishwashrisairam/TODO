import React from 'react';

const Todos = ({todos, deleteTodo}) => {

  const todoList = todos.length ? (
    todos.map(todo => {
      return (
        <div className="collection-item" key={todo.id}>
          <input type="checkbox"/>  
          <span onClick={() => {deleteTodo(todo.id)}}>{todo.content}</span>
          
          
        </div>
      )
    })
  ) : (
    <p className="center">You have no Todo's !!!</p>
  );

  return (
    <div className="todos collection">
       <form>
      {todoList}
      </form>
    </div>
  )
}

export default Todos;