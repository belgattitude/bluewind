export interface QueryResultMany<T> {
    kind: 'many';
    success: true;
    data: T[];
    total?: number;
    limit?: number;
}

export interface QueryResultOne<T> {
    kind: 'one';
    success: true;
    data: T;
}

export interface QueryResultError {
    kind: 'error';
    success: false;
    error: string;
}

export type QueryResult<T> = QueryResultMany<T> | QueryResultOne<T> | QueryResultError;

export function queryFail(error: string): QueryResultError {
    return {
        kind: 'error',
        success: false,
        error,
    };
}

export function querySuccess<T>(props: { data: T[]; total: number; limit?: number }): QueryResult<T> {
    const { total, data, limit } = props;
    return {
        kind: 'many',
        success: true,
        data,
        total,
        limit,
    };
}
