import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css"
import { useTodoState } from '../context/Context';

type Props = {
    todo: Todo;
}

const SingleTodo: React.FC<Props> = ({ todo }) => {

const { dispatch } = useTodoState(); // Usar el dispatch para eliminar o completar tareas
const [edit, setEdit] = useState<boolean>  (false); 
const [editTodo, setEditTodo] = useState<string>(todo.todo); 

const handleEdit = (e:React.FormEvent, id: number) =>
{
    e.preventDefault();

    dispatch({
        type: "edit",
        payload: { id, todo: editTodo }
    });
    setEdit(false);
}; 

const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
    inputRef.current?.focus()
}, [edit])

return (
  <form className='todos_single' onSubmit = {(e) => handleEdit(e, todo.id)}>
    {
        edit? (
            <input
                ref={inputRef}
                value={editTodo} 
                onChange={ (e) => setEditTodo(e.target.value)} 
                className='todos_single_text' 
            />
        ):(
            todo.isDone ? (
                <s className='todos_single_text'>{ todo.todo }</s>
            ):(
                <span className='todos_single_text'>{ todo.todo }</span> 
            )
        )
    }
     <div>
        <span className='icon' 
        onClick={() => 
            !edit && 
            !todo.isDone &&
            setEdit(true)}
        >
            <AiFillEdit />
        </span>
        <span className='icon' 
        onClick={() => dispatch({ 
            type: "remove", 
            payload: todo.id
        })}>
            <AiOutlineDelete />
        </span>
        <span className='icon' 
        onClick={() => dispatch({
            type: "done",
            payload: todo.id
        })}>
            <MdDone />
        </span>
     </div>
  </form> 
  )
}

export default SingleTodo
