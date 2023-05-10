import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import TodoItemModel from "../models/TodoItem";
import TodoList from "./TodoList";
import FilterButton from "./FilterButton";

const LOCAL_STORAGE_KEY = "todos"

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemModel[]>([]);
    const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

    useEffect(() => {
        const loadedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (loadedTodos) {
          const parsedTodos = JSON.parse(loadedTodos);
          console.log('Loaded todos from localStorage:', parsedTodos);
          setTodos(parsedTodos);
        } else {
          console.log('No todos found in localStorage');
        }
      }, []);

    useEffect(() => {
        if(todos?.length) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
        }
    }, [todos]);

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
            <p>Btn: Clear currently viewing list?</p>
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
