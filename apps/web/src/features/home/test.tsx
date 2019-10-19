import React, { ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useAsync } from 'react-async';
import { getStudentApi, StudentDetailDTO } from '../student/student.api';

const studentApi = getStudentApi();

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

    console.log('render');

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();
        const fetchData = async () => {
            console.log('running effect');
            setError(null);
            setLoading(true);
            //const { payload } = await studentApi.search({ query: query || undefined }, abortController.signal);
            const { payload } = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(studentApi.search({ query: query || undefined }, abortController.signal));
                }, 1000);
            });

            if (mounted) {
                if (payload.isError) {
                    setError(payload.error.message);
                } else {
                    setStudentList(payload.value);
                }
                setLoading(false);
            }
        };
        fetchData();
        return () => {
            console.log('aborting');
            abortController.abort();
            mounted = false;
        };
    }, [query, force]);

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
