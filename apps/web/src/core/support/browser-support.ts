const getGlobal = (property: string): unknown => {
    if (typeof self !== 'undefined' && self && property in self) {
        return (self as any)[property];
    }
    if (typeof window !== 'undefined' && window && property in window) {
        return (window as any)[property];
    }
    if (typeof global !== 'undefined' && global && property in global) {
        return (global as any)[property];
    }
    if (typeof globalThis !== 'undefined' && globalThis) {
        return (globalThis as any)[property];
    }
    throw new Error(`Property ${property} is not available`);
};

export function supportsAbortController(): boolean {
    try {
        return typeof getGlobal('AbortController') === 'function';
    } catch (e) {
        return false;
    }
}
