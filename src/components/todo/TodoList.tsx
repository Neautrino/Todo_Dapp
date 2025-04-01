import TodoItem from "./TodoItem";

interface Todo {
    account: {
        idx: number;
        content: string;
        marked: boolean;
        dateline?: string;
    }
}

interface TodoListProps {
    todos: Todo[];
    markAction: (idx: number) => void;
    removeAction: (idx: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, markAction, removeAction }: TodoListProps) => {
    return (
        <ul className="space-y-4 w-full">
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.account.idx} 
                    {...todo.account}  
                    markAction={markAction}
                    removeAction={removeAction}
                />
            ))}
        </ul>
    );
};

export default TodoList;