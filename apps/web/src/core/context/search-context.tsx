/**
 * Experiment - attempt to create a generic search factory providing hook and relying on context
 */
import React, { ReactNode, RefObject, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Result } from '@bluewind/error-flow';

export type SearchContextState = {
    query: string | null;
};

export type SearchContextProps<T extends {}> = {
    data: T[];
    loading: boolean | null;
    error: string | null;
    search: (query: string) => void;
    reload: () => void;
};

type SearchParams = {
    query?: string;
};

export type DataProviderFactory<T> = () => (params: any, props: { signal: AbortSignal }) => Promise<Result<T[], Error>>;

export type SearchContextParams<T> = {
    dataProvider: DataProviderFactory<T>;
};

function createSearchContext<T extends object>(params: SearchContextParams<T>) {
    const { dataProvider } = params;
    const promiseFn = dataProvider();

    const SearchContext = React.createContext<SearchContextProps<T> | null>(null);

    const SearchProvider = (props: { children: ReactNode }) => {
        const [query, setQuery] = useState<SearchContextState['query']>(null);
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<T[]>([]);
        const [force, forceUpdate] = useReducer(x => x + 1, 0);

        useEffect(() => {
            let mounted = true;
            const abortController = new AbortController();
            const fetchData = async () => {
                setError(null);
                setLoading(true);
                const { signal } = abortController;
                /*
                signal.addEventListener('abort', a => {
                    console.log('aborted', loading, a);
                });
                */
                const { payload } = await promiseFn(
                    { query: query || undefined },
                    {
                        signal,
                    }
                );
                if (mounted) {
                    setLoading(false);
                    if (payload.isError) {
                        setError(payload.error.message);
                    } else {
                        setData(payload.value);
                    }
                }
            };
            fetchData();
            return () => {
                // Loading cannot be safely determined here
                // abort should be a no-op anyway
                abortController.abort();
                mounted = false;
            };
        }, [query, force]);

        // Dispatch methods
        const search = (query: string) => {
            setQuery(query);
        };

        const reload = useCallback(() => {
            forceUpdate(force);
        }, [force]);

        return <SearchContext.Provider value={{ data: data, search, reload, loading, error }} {...props} />;
    };

    function useSearch(): SearchContextProps<T> {
        const context = useContext(SearchContext);
        if (context === undefined || context === null) {
            throw new Error(`useSearch must be used within an SearchProvider`);
        }
        return context;
    }

    return { SearchContext, SearchProvider, useSearch };
}

export { createSearchContext };
