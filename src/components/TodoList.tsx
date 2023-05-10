import React from "react";
import TodoItemModel from "../models/TodoItem";
import { FormCheck } from 'react-bootstrap';

interface TodoListProps {
    todos: TodoItemModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemModel[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
    const handleCheckboxChange = (id: number) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
            return todo;
        }));
    }
    return (
        <div>
            <div className="display-list-descriptions">
                <h2>Desciption</h2>
                <h2>Completion status</h2>
            </div>
        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-entry" key={todo.id}>
              <p>{todo.text}</p>
                <FormCheck
                    type="checkbox"
                    id={`check-api-${todo.id}`}
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id)}
                    label={`Mark as completed`}
                />
            </div>
          ))}
        </div>
        </div>
      );
};

export default TodoList;