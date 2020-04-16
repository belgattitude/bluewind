import React, { useEffect, useRef, useState } from 'react';
import { StudentList } from './student.list';
import { StudentDetail } from './student.detail';
import { useDebouncedCallback } from 'use-debounce';
import styled from '@emotion/styled';
import { TextField } from '../../component/ui/form';
import { StudentSearchProvider, useStudentSearch } from './student.search';

const defaultsProps = {
    timeout: 150,
};

type Props = {
    timeout?: number;
    children?: never;
    className?: string;
};

const SearchBox: React.FC<Props> = props => {
    const search = useStudentSearch();
    const {timeout = defaultsProps.timeout} = props;
    const searchRef = useRef<HTMLInputElement>(null);

    const [debouncedCallback] = useDebouncedCallback<string[]>(query => {
        search.search(query);
    }, timeout);

    useEffect(() => {
        if (searchRef && searchRef.current) {
            searchRef.current.focus();
        }
    }, []);
    return (
        <div className={'test-search'}>
            <TextField
                type="search"
                ref={searchRef}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        console.log('selected');
                    }
                }}
                onChange={e => {
                    debouncedCallback(e.currentTarget.value);
                }}
            />
        </div>
    );
};

const List: React.FC<{
    handleSelected: (studentId: number) => void;
}> = props => {
    const { loading, data, error } = useStudentSearch();
    return (
        <div className="test-list">
            {error ? (
                <div>{error}</div>
            ) : (
                <StudentList loading={loading} students={data} handleSelected={props.handleSelected} />
            )}
        </div>
    );
};

const UnstyledStudentPage: React.FC<Props> = props => {
    const [studentId, setStudentId] = useState<number | null>(null);
    const {className, timeout} = props;
    return (
        <div className={className}>
            <StudentSearchProvider>
                <SearchBox timeout={timeout} />
                <div className="result-wrapper">
                    <List handleSelected={studentId => setStudentId(studentId)} />
                    <div className="test-detail">{studentId && <StudentDetail studentId={studentId} />}</div>
                </div>
            </StudentSearchProvider>
        </div>
    );
};

export const StudentPage = styled(UnstyledStudentPage)`
    display: flex;
    flex-direction: column;
    .result-wrapper {
        background-color: white;
        display: flex;
        flex: 1 1 100%;
        .test-list {
            overflow: auto;
            flex: 1 1 100%;
        }
        .test-detail {
            padding: 15px;
            flex: 1 1 100%;
        }
    }
`;
