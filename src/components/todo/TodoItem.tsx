import { Calendar, Check, Trash2 } from "lucide-react";

interface TodoItemProps {
    idx: number;
    content: string;
    marked: boolean;
    dateline?: string;
    markAction: (idx: number) => void;
    removeAction: (idx: number) => void;
}

const TodoItem = ({ idx, content, marked, dateline, markAction, removeAction }: TodoItemProps) => {
    const handleMarkTodo = () => {
        markAction(idx);
    };

    const handleRemoveTodo = () => {
        removeAction(idx);
    };

    return (
        <li key={idx} className="flex items-center justify-between p-3 py-4 border border-none rounded-2xl shadow-sm bg-secondary text-gray w-full">
            <div
                onClick={handleMarkTodo}
                className={`w-5 h-5 rounded-md border-2 border-accent cursor-pointer ${marked ? 'bg-accent opacity-50' : ''}`}
            >
                {marked && (
                    <div className="w-full h-full text-black font-extrabold rounded-md flex items-center justify-center">
                        <Check className="font-bold text-2xl" />
                    </div>
                )}
            </div>
            <div className="flex-1 ml-3">
                <span className="text-base font-medium text-white">{content}</span>
                {dateline && (
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{dateline}</span>
                    </div>
                )}
            </div>
            <div>
                <Trash2
                    onClick={handleRemoveTodo}
                    className={`w-5 h-5 text-accent cursor-pointer transition`}
                />
            </div>
        </li>
    );
};

export default TodoItem;