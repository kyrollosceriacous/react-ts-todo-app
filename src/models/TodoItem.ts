interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    editing?: boolean;
}

export default TodoItem;