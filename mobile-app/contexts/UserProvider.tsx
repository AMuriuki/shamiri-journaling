import { UserType } from "@/types/User";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { useApi } from "./ApiProvider";
import { UserContextType } from "@/types/GlobalContext";

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    login: async () => "default",
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null)
    const api = useApi();

    const login = useCallback(async (username: string, password: string) => {
        const result = await api.login(username, password);
        if (result === "ok") {
            const response = await api.get("/user");
            const _user = response.ok ? response.body : null            
            setUser(_user);
        }
        return result;
    }, [api]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            login
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}