import React from 'react';
import { useDispatch } from 'react-redux';
import { runLoginThunk } from './features/auth/auth.redux';
import styled from '@emotion/styled';
import { Box } from './component/ui';
import { StyledLoginForm } from './features/auth/login.form';

const GenericHeader = styled.div`
    border-bottom: 2px solid deeppink;
    line-height: 2em;
`;

const UnAuthenticatedApp: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <GenericHeader>Header</GenericHeader>
            <Box color={'black'} bg={'white'} p={'10px'}>
                Unauthenticated
                <StyledLoginForm
                    onSubmit={credentials => {
                        dispatch(runLoginThunk(credentials));
                    }}
                />
            </Box>
        </div>
    );
};

export default UnAuthenticatedApp;
