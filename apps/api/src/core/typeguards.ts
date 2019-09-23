// See why:
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
export function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

export function isSafeId(value: unknown | undefined): value is number {
    return Number.isSafeInteger(value as number) && (value as number) > 0;
}
