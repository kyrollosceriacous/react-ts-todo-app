import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import InputField from "./InputField";
import TodoItemModel from "../models/TodoItem";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "todos"

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    count: number;
}

const NavLink = ({ to, children, count }: NavLinkProps) => {
    let location = useLocation();
    let isActive = (to === "/all" && (location.pathname === "/all" || location.pathname === "/"))
                   || location.pathname === to;

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to}>
              {children}
              <strong> ({count})</strong>
            </Link>
        </li>
    );
};

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemModel[]>([]);

    useEffect(() => {
        const loadedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (loadedTodos) {
          const parsedTodos = JSON.parse(loadedTodos);
          setTodos(parsedTodos);
        }
      }, []);

    useEffect(() => {
        if(todos?.length) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
        }
    }, [todos]);

    const allTodosCount = todos.length;
    const activeTodosCount = todos.filter(todo => !todo.completed).length;
    const completedTodosCount = todos.filter(todo => todo.completed).length;

    return (
      <Router>
        <div className='center-div'>
          <div className='big-div'>
            <div className='child-div'>
              <div id='todo-creation'>
                <h1 className='main-heading-app'>Todo web app</h1>
                <InputField todos={todos} setTodos={setTodos} />
              </div>
              <div id='new-div'>
                <h2>I want to view</h2>
                <nav>
                  <ul>
                    <NavLink to="/all" count={allTodosCount}>All</NavLink>
                    <NavLink to="/active" count={activeTodosCount}>Active</NavLink>
                    <NavLink to="/completed" count={completedTodosCount}>Completed</NavLink>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='child-div' id='display-list'>
            <Routes>
                <Route path="/all" element={<TodoList todos={todos} setTodos={setTodos} />} />
                <Route path="/active" element={<TodoList todos={todos.filter(todo => !todo.completed)} setTodos={setTodos} />} />
                <Route path="/completed" element={<TodoList todos={todos.filter(todo => todo.completed)} setTodos={setTodos} />} />
                <Route path="*" element={<TodoList todos={todos} setTodos={setTodos} />} />
            </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
};

export default TodoApp;
