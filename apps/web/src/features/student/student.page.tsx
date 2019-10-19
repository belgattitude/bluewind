import React, { useEffect, useRef, useState } from 'react';
import { StudentList } from './student.list';
import { StudentDetail } from './student.detail';
import { getDefaultStudentApi, StudentApi, StudentDetailDTO, StudentListDTO } from './student.api';
import { useDebouncedCallback } from 'use-debounce';
import styled from '@emotion/styled';
import { TextField } from '../../component/ui/form';

const defaultsProps = {
    timeout: 150,
};

type Props = {
    timeout: number;
    children?: never;
    className?: string;
};

const studentApi = getDefaultStudentApi();

const UnstyledStudentPage: React.FC<Props> = props => {
    const [studentId, setStudentId] = useState<number | null>(null);
    const [query, setQuery] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [studentList, setStudentList] = useState<StudentDetailDTO[]>([]);

    const searchRef = useRef<HTMLInputElement>(null);

    const { timeout = defaultsProps.timeout } = props;
    const [debouncedCallback] = useDebouncedCallback(query => {
        setQuery(query);
    }, timeout);

    useEffect(() => {
        if (searchRef && searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();
        const fetchData = async () => {
            setIsError(false);
            setLoading(true);
            const { payload } = await studentApi.search({ query: query || undefined }, abortController.signal);
            if (mounted) {
                if (payload.isError) {
                    setIsError(true);
                } else {
                    setStudentList(payload.value);
                }
                setLoading(false);
            }
        };
        fetchData();
        return () => {
            abortController.abort();
            mounted = false;
        };
    }, [query]);

    return (
        <div className={props.className}>
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
            <div className="result-wrapper">
                <div className="test-list">
                    <StudentList
                        students={studentList}
                        handleSelected={(studentId: number) => {
                            setStudentId(studentId);
                        }}
                    />
                </div>
                <div className="test-detail">{studentId && <StudentDetail studentId={studentId} />}</div>
            </div>
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
