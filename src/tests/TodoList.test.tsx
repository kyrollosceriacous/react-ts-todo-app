import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import TodoItemModel from '../models/TodoItem';

describe('TodoList', () => {
    let mockSetTodos: jest.Mock;
    const todos: TodoItemModel[] = [
        { id: 1, text: 'Test todo 1', completed: false },
        { id: 2, text: 'Test todo 2', completed: true },
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

    it('handles checkbox/marking as completed change', () => {
        const checkboxes = screen.getAllByLabelText(/Mark as completed/i);
        fireEvent.click(checkboxes[0]);
        expect(mockSetTodos).toHaveBeenCalled();
    });
    

    it('handles todo entry double click', () => {
        const todoElement = screen.getByText(/Test todo 1/i);
        fireEvent.dblClick(todoElement);
        expect(mockSetTodos).toHaveBeenCalled();
    });
});
