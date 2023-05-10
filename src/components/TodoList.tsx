import React from "react";
import TodoItemModel from "../models/TodoItem";
import { FormCheck, Button } from 'react-bootstrap';
import { LOCAL_STORAGE_KEY, TODOS_ACTIVE, TODOS_COMPLETED, EVENT_KEY_ENTER, EVENT_KEY_ESCAPE } from "../config/constants";

interface TodoListProps {
    todos: TodoItemModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemModel[]>>;
    filter: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, filter }) => {
    const [hoveredTodoId, setHoveredTodoId] = React.useState<number | null>(null);

    let filteredTodos = todos;
    switch (filter) {
        case TODOS_ACTIVE:
            filteredTodos = todos.filter(todo => !todo.completed);
            break;
        case TODOS_COMPLETED:
            filteredTodos = todos.filter(todo => todo.completed);
            break;
        default:
            break;
    }

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
        if (event.key === EVENT_KEY_ENTER) {
            handleBlur(id, value);
        } else if (event.key === EVENT_KEY_ESCAPE) {
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

    const handleDeleteClick = (id: number) => {
        const indexToRemove = todos.findIndex((todo) => todo.id === id);
        
        if (indexToRemove !== -1) {
            todos.splice(indexToRemove, 1);
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        setTodos(todos.filter(todo => todo.id !== id));
      };

    const handleMarkAllActiveTodosAsComplete = () => {
        setTodos(todos.map(todo => {
            if (!todo.completed) {
                return {
                    ...todo,
                    completed: true
                };
            }
            return todo;
        }));
    };

    const handleClearCurrentTodoType = () => {
        switch (filter) {
            case 'active':
                const todosOnlyCompleted = todos.filter((todo) => todo.completed === true);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosOnlyCompleted));
                setTodos(todos.filter(todo => todo.completed));
                break;
            case 'completed':
                const todosOnlyActive = todos.filter((todo) => todo.completed === false);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosOnlyActive));
                setTodos(todos.filter(todo => !todo.completed));
                break;
            default:
                break;
        }
    };

    const clearAllTodos = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTodos([]);
    }

    return (
        <div>
            <div className="display-list-descriptions">
                <h3>Description</h3>
                <h3>Completion status</h3>
            </div>
            <div className="todo-list">
                {filteredTodos.map((todo) => (
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
                                    <>
                                        {/*<span className="edit-icon">✎</span>*/}
                                        <span className="delete-icon" onClick={() => handleDeleteClick(todo.id)}>🗑️</span>
                                    </>
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
            <div className="action-buttons-container">
                {filter === 'active' && todos.some(todo => !todo.completed) && <Button  variant="success" className="button-mark-all-completed" onClick={handleMarkAllActiveTodosAsComplete}>Mark All As Completed</Button>}
                {filteredTodos.length !== 0 && filter !== 'all' && <Button variant="warning" className="button-clear-current-viewing-type" onClick={handleClearCurrentTodoType}>Clear Current Viewing Type</Button>}
                {todos.length !== 0 && <Button variant="danger" className="button-clear-all" onClick={clearAllTodos}>Clear <em><strong>All</strong></em> Todos</Button>}
            </div>
        </div>
    );
};

export default TodoList;
