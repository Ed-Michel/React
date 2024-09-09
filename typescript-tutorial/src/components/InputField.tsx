import React, { useRef } from 'react'
import './styles.css'
import { useTodoState } from '../context/Context';

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void; 
} 

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTodoState(); // Usa el hook para obtener el dispatch

  return ( 
  <form className='input' onSubmit={ (e) => {
        handleAdd(e)
        inputRef.current?.blur();
    }}>
    <input 
        ref={inputRef}
        type="input" 
        placeholder='Enter a task' 
        className='input_box' 
        value={todo} 
        onChange={(e) => setTodo(e.target.value)}
    />
     
    <button className='input_submit' type='submit'
    onClick={() => {
      dispatch({
        type: "add",
        payload: todo,
      })
    }}
    >Go</button>
  </form>
  )
}

export default InputField
