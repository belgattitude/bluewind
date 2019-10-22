import React, { useEffect, useRef, useState } from 'react';
import { StudentList } from './student.list';
import { StudentDetail } from './student.detail';
import { getDefaultStudentApi, StudentApi, StudentDetailDTO, StudentListDTO } from './student.api';
import { useDebouncedCallback } from 'use-debounce';
import styled from '@emotion/styled';
import { TextField } from '../../component/ui/form';
import {Result} from "@bluewind/error-flow";
import {createSearchContext} from "../../core/context/search-context";

const defaultsProps = {
    timeout: 150,
};

type Props = {
    timeout: number;
    children?: never;
    className?: string;
};

const dataProvider = (): (params: any, signal: AbortSignal) => Promise<Result<StudentDetailDTO[], Error>> => {
    const studentApi = getDefaultStudentApi();
    return (params: any, signal: AbortSignal) => { return studentApi.search(params, signal) };
}
const {SearchProvider, useSearch} =
    createSearchContext<StudentDetailDTO>({
        dataProvider
    });


const SearchBox: React.FC = props => {
    const search = useSearch();
    const timeout = 150;
    const searchRef = useRef<HTMLInputElement>(null);
    const [debouncedCallback] = useDebouncedCallback(query => {
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
    )
}

const List: React.FC = props => {
    const search = useSearch();
    const [studentId, setStudentId] = useState<number | null>(null);
    return (
        <div className="test-list">
                <StudentList
                    loading={search.loading}
                    students={search.data}
                    handleSelected={(studentId: number) => {
                        setStudentId(studentId);
                    }}
                />
        </div>

    );
}

const UnstyledStudentPage: React.FC<Props> = props => {

    const [studentId, setStudentId] = useState<number | null>(null);
    const { timeout = defaultsProps.timeout } = props;

    return (
        <div className={props.className}>
            <SearchProvider>
                <SearchBox />
                <div className="result-wrapper">
                    <List />
                    <div className="test-detail">{studentId && <StudentDetail studentId={studentId} />}</div>
                </div>
            </SearchProvider>
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
