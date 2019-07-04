import React, { useState, useEffect } from 'react';
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

const TeacherList: React.FC<{}> = () => {
    const classes = useStyles();

    const [data, setData] = useState({ students: [], status: 'loading' });

    useEffect(() => {
        fetch('http://localhost:3000/teacher', {
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                setData({ status: 'loaded', students: response.data });
            })
            .catch(error => setData({ status: 'error', students: [] }));
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
                        {data.students.map((student: any) => (
                            <TableRow key={student.id}>
                                <TableCell align="right">
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {student.lastName}
                                </TableCell>
                                <TableCell align="right">{student.firstName}</TableCell>
                                <TableCell align="right">{student.email}</TableCell>
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

export default TeacherList;
