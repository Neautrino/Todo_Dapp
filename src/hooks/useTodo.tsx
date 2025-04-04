import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useMemo, useState } from "react";
import { TODO_PROGRAM_PUBKEY } from '../constants'
import todoIDL from '../constants/todo.json'
import { PublicKey } from "@solana/web3.js";
import { authorFilter } from "../utils";
import { createTodoProgram, TodoProgram } from "../types";

interface Todo {
    account: {
        idx: number;
        content: string;
        marked: boolean;
    },
    publicKey?: string;
}

let dummyTodos = [
    {
        account: {
            idx: 0,
            content: 'Finish the essay collaboration',
            marked: false,
        }

    },
    {
        account: {
            idx: 1,
            content: 'Understand Static Todo App',
            marked: false,
        }

    },
    {
        account: {
            idx: 2,
            content: 'Read next chapter of the book in Danish',
            marked: false,
        }
    },
    {
        account: {
            idx: 3,
            content: 'Do the math for next monday',
            marked: false,
        }
    },
    {
        account: {
            idx: 4,
            content: 'Send the finished assignment',
            marked: true,
        }
    },
    {
        account: {
            idx: 5,
            content: 'Read english book chapter 5',
            marked: true,
        }
    },
]

export function useTodo() {
    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();
    const { publicKey } = useWallet();

    const [provider, setProvider] = useState<AnchorProvider | null>(null);
    const [initialized, setIniitialized] = useState(false);
    const [lastTodo, setLastTodo] = useState(0);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [transactionPending, setTransactionPending] = useState(false);
    const [input, setInput] = useState("");

    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new AnchorProvider(connection, anchorWallet, {});
            setProvider(provider);
            return createTodoProgram(todoIDL, new PublicKey(TODO_PROGRAM_PUBKEY), provider);
        }
        return null;
    }, [connection, anchorWallet]);

    useEffect(() => {
        
        const findProfileAccounts = async () => {
            if(program && publicKey && !transactionPending){
                setLoading(true);
                try {
                    const [profilePda, profileBump] = await PublicKey.findProgramAddressSync([
                        new BN("USER_STATE").toArrayLike(Buffer, 'le', 8),
                        publicKey.toBuffer(),
                    ], program.programId);

                    const profileAccount = await program.account.userProfile.fetch(profilePda);

                    if (profileAccount) {
                        setLastTodo(profileAccount.lastTodo);
                        setIniitialized(true);

                        const todoAccounts = await program.account.todoAccount.all([authorFilter])
                    }

                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        }
    }, [initialized])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const initializeStaticUser = () => {
        setIniitialized(true);
    }

    const addStaticTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(input){
            const newTodo: Todo = {
                account:{
                    idx: todos[todos.length - 1].account.idx + 1,
                    content: input,
                    marked: false
                }
            }
            setTodos([newTodo,...todos])
            setInput("")
        }
    }

    const markStaticTodo = (todoID: number) => {
        setTodos(
          todos.map(todo => {
            console.log(todo.account, todoID, "YTAAAAA")
            if (todo.account.idx === todoID) {
                console.log("MATCHED")
                return {
                  account: {
                    idx: todo.account.idx,
                    content: todo.account.content,
                    marked: !todo.account.marked
                  }
                }
            }
    
            return todo
          }),
        )
    }

    const removeStaticTodo = async (todoID: number) => {
        setTodos(
            todos.filter(todo => {
              if (todo.account.idx === todoID) {
                return 
              }
      
              return todo
            }),
          )
    }


    const incompleteTodos = useMemo(() => todos.filter((todo) => !todo.account.marked), [todos])
    const completedTodos = useMemo(() => todos.filter((todo) => todo.account.marked), [todos])

    return { initialized, initializeStaticUser, loading, transactionPending, completedTodos, incompleteTodos, markStaticTodo, removeStaticTodo, addStaticTodo, input, setInput, handleChange }

}