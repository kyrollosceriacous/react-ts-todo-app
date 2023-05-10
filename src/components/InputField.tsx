import React, { useState } from "react";
import TodoItemModel from "../models/TodoItem";


interface InputFieldProps {
    todos: TodoItemModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemModel[]>>;
  }

  const InputField: React.FC<InputFieldProps> = ({ todos, setTodos }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [idCounter, setIdCounter] = useState<number>(1);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }
  
    const createTodo = () => {
      if (inputValue.trim() !== '') {
        const newTodo: TodoItemModel = {
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