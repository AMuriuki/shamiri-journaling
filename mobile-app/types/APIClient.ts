export interface RequestOptionsType {
    method: string;
    url: string;
    query?: Record<string, string>;
    headers?: Record<string, string>;
    body?: any;
}

export interface ResponseBodyType {
    access_token?: string;
    code?: number;
    message?: string;
    description?: string;
    errors?: any;
    messages?: any;
}

export interface APIResponseType {
    ok: boolean;
    status: number;
    body: ResponseBodyType
}

export type ErrorHandlerType = (response: APIResponseType) => void;