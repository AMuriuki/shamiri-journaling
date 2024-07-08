import React from "react";
import { UserType } from "./User";

export interface LoginResponseType {
    access_token: string;
    refresh_token: string;
}

export interface UserContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    login: (username: string, password: string) => Promise<string>;
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    isLoading: boolean;
    logout: () => Promise<void>;
}