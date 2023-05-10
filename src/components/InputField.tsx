import React, { useState } from "react";
import TodoItemModel from "../models/TodoItem";
import { Button } from 'react-bootstrap';

interface InputFieldProps {
    todos: TodoItemModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemModel[]>>;
  }

  const InputField: React.FC<InputFieldProps> = ({ todos, setTodos }) => {
    const [inputValue, setInputValue] = useState<string>("");
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }
  
    const createTodo = () => {
      if (inputValue.trim() !== '') {
        const newTodo: TodoItemModel = {
          id: Date.now(),
          text: inputValue,
          completed: false
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
      }
    }
  
    return (
      <div className="input-field">
        <p>Create a new todo:</p>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <Button className="button-create-todo" onClick={createTodo}>
            Create todo
        </Button>
      </div>
    );
  };

export default InputField;