export function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

export function assertIsSafeId(value: unknown | undefined): value is number {
    return Number.isSafeInteger(value as number) && (value as number) > 0;
}
