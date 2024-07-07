import React from "react";
import { UserType } from "./User";

export interface UserContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    login: (username: string, password: string) => Promise<string>;
}