export type APIResponse<T> =
    | { type: 'rows'; data: T[]; success: true; total: number; limit: number }
    | { type: 'row'; data: T; success: true }
    | { type: 'error'; success: false; error: string };

export type StudentOut = {
    first_name: string;
    last_name: string;
    id: number;
};

type HNResponse<S> = {
    data: S[];
    total: number;
};

export type ApiReducerState<T> =
    | { status: 'empty' }
    | { status: 'loading' }
    | { status: 'error'; error: string }
    | { status: 'success'; result: T[] };

export type ApiReducerAction<S> =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; response: HNResponse<S> }
    | { type: 'FETCH_FAILURE'; error: string };

export const apiReducer = <S>(state: ApiReducerState<S>, action: ApiReducerAction<S>): ApiReducerState<S> => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { status: 'loading' };
        case 'FETCH_SUCCESS':
            return { status: 'success', result: action.response.data };
        case 'FETCH_FAILURE':
            return { status: 'error', error: action.error };
    }
};
