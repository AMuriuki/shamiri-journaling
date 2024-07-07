import { APIResponseType, ErrorHandlerType, RequestOptionsType } from "./types/APIClient";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API_URL = "https://8943-105-163-157-208.ngrok-free.app";

export default class ShamiriAPIClient {
    private base_url: string;
    private onError: ErrorHandlerType;

    constructor(onError: ErrorHandlerType) {
        this.onError = onError;
        this.base_url = BASE_API_URL + '/api';
    }

    private async request(options: RequestOptionsType) {
        let response = await this.requestInternal(options);
        if (response.status === 401 && options.url !== '/tokens') {
            const refreshResponse = await this.put('/tokens', {
                access_token: AsyncStorage.getItem('accessToken'),
            });
            if (refreshResponse.ok && refreshResponse.body?.access_token) {
                AsyncStorage.setItem('accessToken', refreshResponse.body.access_token);
                response = await this.requestInternal(options);
            }
        }
        if (response.status >= 500 && this.onError) {
            this.onError(response);
        }
        return response;
    }

    private async requestInternal(options: RequestOptionsType): Promise<APIResponseType> {
        let query = new URLSearchParams(options.query || {}).toString();
        if (query !== '') {
            query = '?' + query;
        }

        let response;
        try {
            response = await fetch(this.base_url + options.url + query, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AsyncStorage.getItem('accessToken'),
                    ...options.headers,
                },
                credentials: options.url === '/tokens' ? 'include' : 'omit',
                body: options.body ? JSON.stringify(options.body) : null,
            });
        }
        catch (error: any) {
            response = {
                ok: false,
                status: 500,
                json: async () => {
                    return {
                        code: 500,
                        message: 'The server is unresponsive',
                        description: error.toString(),
                    };
                }
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !== 204 ? await response.json() : null
        };
    }

    public async get(url: string, query?: Record<string, string>, options?: Omit<RequestOptionsType, 'method' | 'url' | 'query'>): Promise<APIResponseType> {
        return this.request({ method: 'GET', url, query, ...options });
    }

    public async post(url: string, body?: any, options?: Omit<RequestOptionsType, 'method' | 'url' | 'body'>): Promise<APIResponseType> {
        return this.request({ method: 'POST', url, body, ...options });
    }

    public async put(url: string, body?: any, options?: Omit<RequestOptionsType, 'method' | 'url' | 'body'>): Promise<APIResponseType> {
        return this.request({ method: 'PUT', url, body, ...options });
    }

    public async delete(url: string, options?: Omit<RequestOptionsType, 'method' | 'url'>): Promise<APIResponseType> {
        return this.request({ method: 'DELETE', url, ...options });
    }

    public async login(username: string, password: string): Promise<'ok' | 'fail' | 'error'> {
        const response = await this.post('/tokens', null, {
            headers: {
                Authorization: 'Basic ' + btoa(username + ":" + password)
            }
        });
        if (!response.ok) {
            return response.status === 401 ? 'fail' : 'error';
        }
        AsyncStorage.setItem('accessToken', response.body?.access_token || '');
        return 'ok';
    }

    public async logout(): Promise<void> {
        await this.delete('/tokens');
        AsyncStorage.removeItem('accessToken');
    }

    public isAuthenticated(): boolean {
        return AsyncStorage.getItem('accessToken') !== null;
    }

}

interface JsonMessages {
    [key: string]: string[];
}

interface ErrorResponse {
    messages?: {
        json?: JsonMessages;
    };
    message?: string;
    error?: string;
}

export const extractErrorMessages = (errorResponse: ErrorResponse | undefined): string => {
    if (!errorResponse || typeof errorResponse !== 'object') {
        return 'An unknown error occurred.';
    }

    let messages: string[] = [];

    // Check for the specific structure in your error response
    if (errorResponse.messages?.json) {
        const jsonMessages = errorResponse.messages.json;
        for (const key in jsonMessages) {
            if (Array.isArray(jsonMessages[key]) && jsonMessages[key].length > 0) {
                messages = [...messages, ...jsonMessages[key]];
            }
        }
    } else if (errorResponse.message) {
        messages.push(errorResponse.message);
    } else if (errorResponse.error) {
        messages.push(errorResponse.error);
    } else {
        messages.push('An unknown error occurred.');
    }

    return messages.join('\n');
};