import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

//Appwrite imports
import { AppwriteException, ID, Models } from 'appwrite';
import { account } from "@/models/client/config";

export interface IUserPrefs {
    reputation: number;
}

interface IAuthStore {
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<IUserPrefs> | null;
    hydrated: boolean;

    setHydrated(): void;
    verifySession(): Promise<void>;
    login(
        email: string,
        password: string
    ): Promise<{ success: boolean; error?: AppwriteException | null }>;
    createAccount(
        name: string,
        email: string,
        password: string
    ): Promise<{ success: boolean, error?: AppwriteException | null }>;

}


