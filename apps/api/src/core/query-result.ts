export interface QueryResultMany<T> {
    kind: 'many';
    data: T[];
    total?: number;
    limit?: number;
}

export interface QueryResultOne<T> {
    kind: 'one';
    data: T;
}

export interface QueryResultError {
    kind: 'error';
    error: string;
}

export type QueryResult<T> = QueryResultMany<T> | QueryResultOne<T> | QueryResultError;

export function queryFail(error: string): QueryResultError {
    return {
        kind: 'error',
        error: error,
    };
}

export function querySuccess<T>(props: { data: T[]; total: number; limit?: number }): QueryResult<T> {
    const { total, data, limit } = props;
    return {
        kind: 'many',
        data,
        total,
        limit,
    };
}
