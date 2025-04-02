import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

// Define account interfaces based on your IDL
export interface UserProfile {
  authority: PublicKey;
  lastTodo: number;
  todoCount: number;
}

export interface TodoAccount {
  authority: PublicKey;
  idx: number;
  content: string;
  marked: boolean;
}

// Use type casting to help TypeScript understand the program structure
export interface TodoProgram extends Program {
  account: {
    userProfile: {
      fetch: (address: PublicKey) => Promise<UserProfile>;
      all: (filter?: any) => Promise<{ publicKey: PublicKey; account: UserProfile }[]>;
      // Add other methods you need
    };
    todoAccount: {
      fetch: (address: PublicKey) => Promise<TodoAccount>;
      all: (filter?: any) => Promise<{ publicKey: PublicKey; account: TodoAccount }[]>;
      // Add other methods you need
    };
  };
  // Add instruction methods if needed
}

// Helper function to create a properly typed program instance
export function createTodoProgram(
  idl: Idl,
  programId: PublicKey,
  provider: AnchorProvider
): TodoProgram {
  return new Program(idl, programId, provider) as unknown as TodoProgram;
}