import React from "react";
import TodoItem from "../models/TodoItem";

interface TodoListProps {
    todos: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
      <div className="todo-list">
        {todos.map((todo) => <p key={todo.id}>{todo.text}</p>)}
      </div>
    );
};

export default TodoList;