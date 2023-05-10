import { render, fireEvent, screen } from '@testing-library/react';
import InputField from '../components/InputField';
import TodoItemModel from '../models/TodoItem';

describe('InputField', () => {
    let mockSetTodos: jest.Mock;
    const todos: TodoItemModel[] = [
        { id: 1, text: 'Test todo 1', completed: false },
        { id: 2, text: 'Test todo 2', completed: true },
    ];

    beforeEach(() => {
        mockSetTodos = jest.fn();
        render(
            <InputField todos={todos} setTodos={mockSetTodos} />
        );
    });

    it('renders correctly', () => {
        const inputElement = screen.getByRole('textbox');
        const buttonElement = screen.getByRole('button', { name: /Create todo/i });
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it('handles input change', () => {
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'New todo' } });
        expect(inputElement.value).toBe('New todo');
    });

    it('creates new todo on enter key press', () => {
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'New todo' } });
        fireEvent.keyDown(inputElement, { key: 'Enter' });

        const newTodo: TodoItemModel = {
            id: expect.any(Number),
            text: 'New todo',
            completed: false,
        };
        expect(mockSetTodos).toHaveBeenCalledWith([...todos, newTodo]);
    });

    it('creates new todo on button click', () => {
        const inputElement = screen.getByRole('textbox');
        const buttonElement = screen.getByRole('button', { name: /Create todo/i });
        fireEvent.change(inputElement, { target: { value: 'New todo' } });
        fireEvent.click(buttonElement);

        const newTodo: TodoItemModel = {
            id: expect.any(Number),
            text: 'New todo',
            completed: false,
        };
        expect(mockSetTodos).toHaveBeenCalledWith([...todos, newTodo]);
    });
});
