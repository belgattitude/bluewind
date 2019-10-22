import React, { useState } from 'react';
import styled from '@emotion/styled';
//import { SearchProvider, useSearch } from './test';
import { useDebouncedCallback } from 'use-debounce';
import { TextField } from '../../component/ui/form';
import { Button } from '../../component/ui/button';
import {getDefaultStudentApi, StudentDetailDTO} from "../student/student.api";
import {Result} from "@bluewind/error-flow";
import {createSearchContext} from "../../core/context/search-context";

type Props = {};

const dataProvider = (): (params: any, signal: AbortSignal) => Promise<Result<StudentDetailDTO[], Error>> => {
    const studentApi = getDefaultStudentApi();
    return (params: any, signal: AbortSignal) => { return studentApi.search(params, signal) };
}
const {SearchProvider, useSearch} =
    createSearchContext<StudentDetailDTO>({
        dataProvider
    });

const TestList: React.FC<{}> = props => {
    const search = useSearch();
    if (search.loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {search.data.map(student => (
                <div key={student.id}>
                    {student.first_name} {student.last_name}
                </div>
            ))}
        </div>
    );
};

const TestQuery: React.FC<{}> = props => {
    const search = useSearch();
    const [debouncedCallback] = useDebouncedCallback(query => {
        search.search(query);
    }, 150);
    return (
        <div>
            <TextField
                placeholder={'Type something'}
                onChange={e => {
                    debouncedCallback(e.currentTarget.value);
                }}
            />
            <Button
                style={{
                    backgroundColor: 'white',
                    color: 'grey',
                }}
                size={'medium'}
                onClick={() => {
                    search.reload();
                }}
            >
                Reload
            </Button>
        </div>
    );
};

const UnstyledHomePage: React.FC<Props> = props => {
    return (
        <div>
            Few tests to see how we can make this generic with context and hooks performance wise.
            <hr />
            <SearchProvider>
                <div>
                    <TestQuery />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TestList />
                    <TestList />
                    <TestList />
                    <TestList />
                </div>
            </SearchProvider>
        </div>
    );
};

export const HomePage = styled(UnstyledHomePage)``;
