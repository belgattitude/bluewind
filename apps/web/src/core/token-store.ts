import { assertNever } from './typeguards';
import is from '@sindresorhus/is';

const localStorageKey = '__bluewind_token__';

let localStorageTokenStore: LocalStorageTokenStore;

type TokenStoreStrategy = 'local_storage';

export interface ITokenStore {
    setToken(token: string): void;
    removeToken(): void;
    getToken(): string | null;
}

class LocalStorageTokenStore implements ITokenStore {
    setToken(token: string): void {
        window.localStorage.setItem(localStorageKey, token);
    }

    removeToken(): void {
        window.localStorage.removeItem(localStorageKey);
    }

    getToken(): string | null {
        return window.localStorage.getItem(localStorageKey);
    }
}

export function getTokenStore(type: TokenStoreStrategy = 'local_storage'): ITokenStore {
    switch (type) {
        case 'local_storage':
            if (!localStorageTokenStore) {
                localStorageTokenStore = new LocalStorageTokenStore();
            }
            return localStorageTokenStore;
        default:
            assertNever(type);
            throw new Error(`Unsupported token store strategy '${type}'`);
    }
}
