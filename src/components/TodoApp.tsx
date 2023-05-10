import React, { useState } from "react";
import InputField from "./InputField";
import TodoItemModel from "../models/TodoItem";
import TodoList from "./TodoList";

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemModel[]>([]);

    return (
    <div className="center-div">
    <div className="big-div">
        <div className="child-div">
        <div id="todo-creation">
            <h1 className="main-heading-app">Todo web app</h1>
            <InputField todos={todos} setTodos={setTodos}/>
        </div>  
        <div id="new-div">
            <p>hello there general kenobi</p>
        </div>
        </div>
        <div className="child-div" id="display-list">
        <TodoList todos={todos} setTodos={setTodos}/>
        </div>
    </div>
    </div>
    )
}

export default TodoApp;