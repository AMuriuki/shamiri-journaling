import React from "react";
import { UserType } from "./User";

export interface GlobalContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    isLoading: boolean;
}