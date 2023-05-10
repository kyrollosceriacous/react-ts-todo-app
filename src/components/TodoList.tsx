import React from "react";
import TodoItemModel from "../models/TodoItem";
import { FormCheck } from 'react-bootstrap';

interface TodoListProps {
    todos: TodoItemModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemModel[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
    const [hoveredTodoId, setHoveredTodoId] = React.useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setHoveredTodoId(id);
    };
    
    const handleMouseLeave = () => {
        setHoveredTodoId(null);
    };

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
    };

    const handleDoubleClick = (id: number) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    editing: true
                };
            }
            return todo;
        }));
    }

    const handleBlur = (id: number, value: string) => {
        if (value.trim() === '') {
            setTodos(todos.filter(todo => todo.id !== id));
        } else {
            setTodos(todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        text: value.trim(),
                        editing: false
                    };
                }
                return todo;
            }));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent, id: number, value: string) => {
        if (event.key === 'Enter') {
            handleBlur(id, value);
        } else if (event.key === 'Escape') {
            setTodos(todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        editing: false
                    };
                }
                return todo;
            }));
        }
    };

    return (
        <div>
            <div className="display-list-descriptions">
                <h3>Description</h3>
                <h3>Completion status</h3>
            </div>
            <div className="todo-list">
                {todos.map((todo) => (
                    <div className={`todo-entry ${todo.editing ? 'editing' : ''}`} key={todo.id}>
                        {todo.editing ? (
                            <input
                                type="text"
                                defaultValue={todo.text}
                                onBlur={(e) => handleBlur(todo.id, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, todo.id, e.currentTarget.value)}
                                autoFocus
                            />
                        ) : (
                            <div className="todo-text-wrapper"
                                onMouseEnter={() => handleMouseEnter(todo.id)}
                                onMouseLeave={() => handleMouseLeave()}
                            >
                                <p className="todo-text"
                                onDoubleClick={() => handleDoubleClick(todo.id)}
                                >
                                    {todo.text}
                                </p>
                                {hoveredTodoId === todo.id && (
                                    <span className="edit-icon">✎</span>
                                )}
                            </div>
                        )}
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
