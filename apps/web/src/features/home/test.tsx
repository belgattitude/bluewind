import React, { ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useAsync } from 'react-async';
import { getDefaultStudentApi, StudentDetailDTO } from '../student/student.api';

const studentApi = getDefaultStudentApi();

export type AuthContextState = {
    query: string | null;
};

export type SearchContextProps = {
    data: StudentDetailDTO[];
    loading: boolean;
    error: string | null;
    search: (query: string) => void;
    reload: () => void;
};

const SearchContext = React.createContext<SearchContextProps | null>(null);

const SearchProvider = (props: { children: ReactNode }) => {
    const [query, setQuery] = useState<AuthContextState['query']>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [studentList, setStudentList] = useState<StudentDetailDTO[]>([]);
    const [force, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();
        const fetchData = async (signal: AbortSignal) => {
            console.log('running effect');
            setError(null);
            setLoading(true);
            const { payload } = await studentApi.search({ query: query || undefined }, signal);
            /*
            const { payload } = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(studentApi.search({ query: query || undefined }, signal));
                }, 1000);
            });
            */

            if (mounted) {
                if (payload.isError) {
                    setError(payload.error.message);
                } else {
                    setStudentList(payload.value);
                }
                setLoading(false);
            }
        };
        fetchData(abortController.signal);
        return () => {
            abortController.abort();
            console.log('Aborting', query, loading, abortController.signal);
            mounted = false;
        };
    }, [query, force, loading]);

    // Dispatch methods
    const search = (query: string) => {
        setQuery(query);
    };

    const reload = useCallback(() => {
        console.log('force reloading');
        forceUpdate(force);
    }, [force]);

    return <SearchContext.Provider value={{ data: studentList, search, reload, loading, error }} {...props} />;
};

function useSearch(): SearchContextProps {
    const context = useContext(SearchContext);
    if (context === undefined || context === null) {
        throw new Error(`useSearch must be used within an SearchProvider`);
    }
    return context;
}

export { SearchProvider, useSearch };
