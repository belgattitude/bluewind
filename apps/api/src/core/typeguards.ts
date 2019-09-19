// See why:
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
export function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
