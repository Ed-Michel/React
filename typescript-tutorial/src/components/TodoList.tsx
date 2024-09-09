import React from 'react';
import "./styles.css";
import SingleTodo from './SingleTodo';
import { useTodoState } from '../context/Context';

const TodoList: React.FC = () => {
  const { state: todos } = useTodoState(); // Necesitamos el estado de los todos

  return (
  <div className='todos'>
    {todos.map((todo) => (
     <SingleTodo 
        todo={todo} 
        key={todo.id}
     />
    ))}
    </div>
  );
};

export default TodoList
