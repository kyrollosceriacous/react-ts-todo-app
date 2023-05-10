import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import TodoItemModel from '../models/TodoItem';

describe('TodoList', () => {
    let mockSetTodos: jest.Mock;
    const todos: TodoItemModel[] = [
        { id: 1, text: 'Test todo 1', completed: false, editing: false },
        { id: 2, text: 'Test todo 2', completed: true, editing: false },
    ];

    beforeEach(() => {
        mockSetTodos = jest.fn();
        render(
            <TodoList todos={todos} setTodos={mockSetTodos} filter="all" />
        );
    });

    it('renders todos based on filter property', () => {
        const todoElement = screen.getByText(/Test todo 1/i);
        expect(todoElement).toBeInTheDocument();
    });

    it('handles checkbox/marking a todo entry as completed change', () => {
        const checkboxes = screen.getAllByLabelText(/Mark as completed/i);
        fireEvent.click(checkboxes[0]);

        const expectedTodos = [
            { id: 1, text: 'Test todo 1', completed: !todos[0].completed, editing: false },
            ...todos.slice(1)
        ];
        expect(mockSetTodos).toHaveBeenCalledWith(expectedTodos);
    });

    it('handles todo entry double click', () => {
        const todoElement = screen.getByText(/Test todo 1/i);
        fireEvent.dblClick(todoElement);

        const expectedTodos = [
            { id: 1, text: 'Test todo 1', completed: false, editing: true },
            ...todos.slice(1)
        ];
        expect(mockSetTodos).toHaveBeenCalledWith(expectedTodos);
    });
});
