import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';
import ShamiriAPIClient from '@/ShamiriAPIClient';
import { Alert } from 'react-native';

type ApiContextType = ShamiriAPIClient | null;

const ApiContext = createContext<ApiContextType>(null);

export default function ApiProvider({ children }: { children: ReactNode }) {

    const onError = useCallback(() => {
        Alert.alert('An unexpected error has occurred. Please try again later.', 'danger');
    }, [alert]);

    const api = useMemo(() => new ShamiriAPIClient(onError), [onError]);

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi(): ShamiriAPIClient {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useAPI must be used within am API provider");
    }
    return context;
}
