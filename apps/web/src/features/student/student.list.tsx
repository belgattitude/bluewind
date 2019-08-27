import React, {useCallback, useEffect, useState} from 'react';
import { StudentApi,StudentListDTO} from './student.api';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Box, Checkbox, IconButton, InputBase, ListItemSecondaryAction, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

type StudentListProps = {
    handleEdit: (studentId: number) => void;
    handleDelete: (studentId: number) => void;
    handleSearchChange: (query: string) => void;
};
const studentApi = new StudentApi();

export const StudentList: React.FC<StudentListProps> = props => {
    const [query, setQuery] = useState<string>('');
    const [studentList, setStudentList] = useState<StudentListDTO>([]);
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        studentApi.getStudents({query: query}).then(response => {
            setStudentList(response);
        })
    }, [query]);


    return (

            <List className={classes.root}>

                {studentList.map(student => {
                    const avatarUrl = `https://api.adorable.io/avatars/150/${student.first_name}@adorable.io`
                    const fullName = student.first_name + ' ' + student.last_name;
                    const selected = 3;
                    return (
                        <React.Fragment key={student.id}>
                        <ListItem button alignItems="flex-start" selected={selected === student.id}
                        onClick={() => {props.handleEdit(student.id)}}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={avatarUrl} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={fullName}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {student.first_name}{' '}{student.last_name}
                                        </Typography>
                                        {` — ${student.email || ''}`}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(student.id)}
                                    checked={checked.indexOf(student.id) !== -1}
                                    inputProps={{ 'aria-labelledby': fullName}}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </React.Fragment>
                    );
                })}
            </List>

    );
};



const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },

        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',

        },
        inline: {
            display: 'inline',

        },

        input: {
            marginLeft: 8,
            backgroundColor: 'white',
            flex: 1,
        },
        iconButton: {
            padding: 10,
        }
    }),
);
