// typeguard
import is from '@sindresorhus/is';
import { ApiResponse } from './api.interfaces';

export function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

export function isApiResponse(response: unknown): response is ApiResponse {
    console.log('response', response);
    console.log('response', is.plainObject(response) && response.success !== undefined && response.data !== undefined);
    return is.plainObject(response) && response.success !== undefined && response.data !== undefined;
}
