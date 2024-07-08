import { UserType } from "@/types/User";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useApi } from "./ApiProvider";
import { UserContextType } from "@/types/GlobalContext";

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    login: async () => "",
    isLogged: false,
    setIsLogged: () => { },
    isLoading: true
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null)
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const api = useApi();

    useEffect(() => {
        (async () => {
            const isAuthenticated = await api.isAuthenticated();
            if (isAuthenticated) {
                const response = await api.get("/user");
                setIsLogged(true);
                setUser(response.ok ? response.body : null);
            } else {
                setIsLogged(false);
                setUser(null);
            }
            setIsLoading(false);
        })
    }, [api]);

    const login = useCallback(async (username: string, password: string) => {
        const result = await api.login(username, password);
        if (result === "ok") {
            const response = await api.get("/user");
            const _user = response.ok ? response.body : null
            setIsLogged(true);
            setUser(_user);
        }
        setIsLoading(false);
        return result;
    }, [api]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            login,
            isLogged,
            setIsLogged,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}