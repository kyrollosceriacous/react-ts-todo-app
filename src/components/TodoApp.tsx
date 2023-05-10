import React, { useState } from "react";
import InputField from "./InputField";
import TodoItemModel from "../models/TodoItem";
import TodoList from "./TodoList";
import FilterButton from "./FilterButton";

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemModel[]>([]);
    const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.completed
        if (filter === 'active') return !todo.completed
        return false;
    });

  const filterTodos = (filter: 'all' | 'completed' | 'active') => {
    setFilter(filter);
  };

  return (
    <div className='center-div'>
      <div className='big-div'>
        <div className='child-div'>
          <div id='todo-creation'>
            <h1 className='main-heading-app'>Todo web app</h1>
            <InputField todos={todos} setTodos={setTodos} />
            <FilterButton filterTodos={filterTodos} />
          </div>
          <div id='new-div'>
            <p>Hello there general kenobi</p>
          </div>
        </div>
        <div className='child-div' id='display-list'>
          <TodoList todos={filteredTodos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;