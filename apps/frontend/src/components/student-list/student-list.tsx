import React, { useState, useEffect, useReducer } from 'react';
import {
    Avatar,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import { httpFetch, HttpFetchResponse } from '../../helpers/httpFetch.helper';
import { apiReducer, ApiReducerAction, ApiReducerState, StudentOut } from '../../hooks/use-api-reducer';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

const StudentList: React.FC<{}> = () => {
    const classes = useStyles();

    const [state, dispatch] = useReducer<React.Reducer<ApiReducerState<StudentOut>, ApiReducerAction<StudentOut>>>(
        apiReducer,
        { status: 'empty' }
    );

    useEffect(() => {
        let ignore = false;
        dispatch({ type: 'FETCH_INIT' });
        fetch(`http://localhost:3000/student`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('error');
                }
                return response.json();
            })
            .then(response => {
                if (!ignore) {
                    // Here check response format
                    dispatch({ type: 'FETCH_SUCCESS', response: response });
                }
            })
            .catch(error => {
                dispatch({ type: 'FETCH_FAILURE', error: error });
            });

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <Grid item xs={12}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.status === 'success' &&
                            state.result.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell align="right">
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {student.first_name}
                                    </TableCell>
                                    <TableCell align="right">{student.first_name}</TableCell>
                                    <TableCell align="right">{student.last_name}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={30}
                                rowsPerPage={10}
                                page={1}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'Rows per page' },
                                    native: true,
                                }}
                                onChangePage={() => {}}
                                onChangeRowsPerPage={() => {}}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </Grid>
    );
};

export default StudentList;
