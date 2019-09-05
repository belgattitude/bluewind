import React, { useState } from 'react';
import { StudentList } from './student.list';
import useReactRouter from 'use-react-router';
import { StudentDetail } from './student.detail';

import {
    AppBar,
    Button,
    Container,
    createStyles,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Theme, Toolbar,
    Tooltip
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

export const StudentPage: React.FC = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const classes = useStyles();

    const handleSearchChange = (query: string) => {
        console.log('THE SEARCH HAVE CHANGED');
        setSelected(null);
    };

    return (
        <div className={classes.root}>
            <Container>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppBar position="relative" color="default" elevation={2}>
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <SearchIcon className={classes.block} color="inherit" />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        placeholder="Search by email address, phone number, or user UID"
                                        InputProps={{
                                            disableUnderline: true,
                                            className: classes.searchInput,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" className={classes.addUser}>
                                        Add student
                                    </Button>
                                    <Tooltip title="Reload">
                                        <IconButton>
                                            <RefreshIcon className={classes.block} color="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={6} style={{backgroundColor: 'white'}}>
                    <StudentList
                        students={[]}
                        handleEdit={student => setSelected(student)}
                        handleDelete={student => {
                            console.log('delete');
                        }}
                        handleSearchChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={6} style={{backgroundColor: 'white'}}>
                    {selected && <StudentDetail studentId={selected} />}
                </Grid>
            </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //flexGrow: 1,
            border: "1px solid blue"
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        searchInput: {
            fontSize: theme.typography.fontSize,
        },
        block: {
            display: 'block',
        },
        addUser: {
            marginRight: theme.spacing(1),
        },
        contentWrapper: {
            margin: '40px 16px',
        },
    }),
);
