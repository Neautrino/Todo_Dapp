import TodoList from "./TodoList";

type TodoSectionProps = {
    title: string;
    todos: { account: { idx: number; content: string; marked: boolean; dateline?: string }}[];
    markAction: (idx: number) => void;
    removeAction: (idx: number) => void;
};

const TodoSection: React.FC<TodoSectionProps> = ({ title, todos, markAction, removeAction }) => {
    return (
        <div className="my-8 text-gray w-full">
            <h1 className="text-lg font-semibold text-white mb-4">
                {title} - {todos.length}
            </h1>
            <TodoList todos={todos} markAction={markAction} removeAction={removeAction} />
        </div>
    );
};

export default TodoSection;
