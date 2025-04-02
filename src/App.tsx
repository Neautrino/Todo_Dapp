import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Loading from "./components/Loading"
import TodoSection from "./components/todo/TodoSection"
import { useTodo } from "./hooks/useTodo"

function App() {
  const { initialized, initializeStaticUser, loading, transactionPending, completedTodos, incompleteTodos, markStaticTodo, removeStaticTodo, addStaticTodo, input, handleChange } = useTodo()

  return (
    <div className="flex flex-col items-center min-h-screen bg-primary text-gray text-xl p-4 mt-20">
      <div className="w-[480px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] flex justify-between">
        {initialized ? (
          <div className="flex items-center gap-3 bg-secondary p-4 rounded-2xl shadow-lg">
            <div className="flex-1">
              <form onSubmit={addStaticTodo}>
                <input
                  value={input}
                  onChange={handleChange}
                  type="text"
                  placeholder="Create a new todo..."
                  className="w-full py-2 text-2xl bg-transparent border border-none rounded-lg focus:outline-none"
                />
              </form>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="w-full max-w-[230px] p-4 bg-accent text-primary font-medium rounded-md hover:opacity-80 transition disabled:opacity-50"
            onClick={initializeStaticUser}
            disabled={transactionPending}
          >
            Initialize
          </button>
        )}

        <WalletMultiButton style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-primary)"
        }} />
      </div>

      <div className="w-[480px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] mt-6">
        <Loading loading={loading}>
          <TodoSection title="Tasks" todos={incompleteTodos} markAction={markStaticTodo} removeAction={removeStaticTodo} />
          <TodoSection title="Completed" todos={completedTodos} markAction={markStaticTodo} removeAction={removeStaticTodo} />
        </Loading>
      </div>
    </div>
  )


}

export default App
