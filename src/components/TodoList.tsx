import React from "react";
import TodoItemModel from "../models/TodoItem";

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
              <label className="mark-as-completed" htmlFor={`checkbox-${todo.id}`}>
                Mark as completed
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id)}
                />
              </label>
            </div>
          ))}
        </div>
        </div>
      );
};

export default TodoList;