import React, { useState } from "react";
import TodoItem from "../models/TodoItem";


interface InputFieldProps {
    todos: TodoItem[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  }

  const InputField: React.FC<InputFieldProps> = ({ todos, setTodos }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [idCounter, setIdCounter] = useState<number>(1);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }
  
    const createTodo = () => {
      if (inputValue.trim() !== '') {
        const newTodo: TodoItem = {
          id: idCounter,
          text: inputValue,
          completed: false
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
        setIdCounter(idCounter + 1);
      }
    }
  
    return (
      <div className="input-field">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <p>Your input: {inputValue}</p>
        <button onClick={createTodo}>
          Create todo
        </button>
      </div>
    );
  };
  

export default InputField;