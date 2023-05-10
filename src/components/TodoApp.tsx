import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useMatch} from "react-router-dom";
import InputField from "./InputField";
import TodoItemModel from "../models/TodoItem";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "todos"

interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
}

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
    
    const CustomLink = ({ to, children }: CustomLinkProps) => {
        let match = useMatch(to);
        return (
          <li className={match ? 'active' : ''}>
            <Link to={to}>{children}</Link>
          </li>
        );
    }


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
                    <CustomLink to="/all">All</CustomLink>
                    <CustomLink to="/active">Active</CustomLink>
                    <CustomLink to="/completed">Completed</CustomLink>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='child-div' id='display-list'>
              <Routes>
                <Route path="/" element={<TodoList todos={todos} setTodos={setTodos} />} />
                <Route path="/all" element={<TodoList todos={todos} setTodos={setTodos} />} />
                <Route path="/active" element={<TodoList todos={todos.filter(todo => !todo.completed)} setTodos={setTodos} />} />
                <Route path="/completed" element={<TodoList todos={todos.filter(todo => todo.completed)} setTodos={setTodos} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
};

export default TodoApp;
