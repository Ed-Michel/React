import React, { createContext, ReactNode, useContext, useReducer } from 'react'
import { Todo } from '../model';
import { TodoReducer } from './Reducer';

// Define el tipo del contexto que incluye el estado de los todos y el dispatch
interface TodoContextType {
  state: Todo[];
  dispatch: React.Dispatch<any>;
}

// Crear el contexto
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Crea un hook para usar el contexto
export const useTodoState = () => {
  const context = useContext(TodoContext);
  if (!context){
    throw new Error('useTodoState debe usarse dentro de un Context')
  }
  return context;
}

// Crea el proveedor del contexto
interface TodoProviderProps {
  children: ReactNode;
}

export const Context = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(TodoReducer, []) ; 
  
  return (
    <TodoContext.Provider value={{ state, dispatch }} >
      {children}
    </TodoContext.Provider>
  );
}
