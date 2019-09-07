import React, {useCallback, useEffect, useState} from 'react';
import {StudentApi, StudentDetailDTO, StudentListDTO} from './student.api';
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
import {useKeyPress} from "../../component/core/hooks/use-key-press";

type StudentListProps = {
    students: StudentDetailDTO[];
    handleEdit?: (studentId: number) => void;
    handleDelete?: (studentId: number) => void;
    handleSearchChange?: (query: string) => void;
    handleSelected?: (studentId: number) => void;
};
const studentApi = new StudentApi();

/*
export const StudentList: React.FC<StudentListProps> = props => {
    //const [query, setQuery] = useState<string>('');
    const [studentList, setStudentList] = useState<StudentListDTO>([]);
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    //const query = props.query ? props.query : undefined;
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
        studentApi.getStudents({query: props.query || undefined}).then(response => {
            setStudentList(response);
        })
    }, [props.query]);


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
            height: '100%',

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
*/


export const StudentList: React.FC<StudentListProps> = props => {

    const {students} = props;
    const [cursor, setCursor] = useState<number>(0);
    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const [hovered, setHovered] = useState(undefined);

    useEffect(() => {
        if (downPress) {
            setCursor(prevState =>
                prevState < students.length - 1 ? prevState + 1 : 0
            );
        }
    }, [downPress, students.length]);

    useEffect(() => {
        if (upPress) {
            setCursor(prevState =>
                prevState > 0 ? prevState - 1 : students.length - 1
            );
        }
    }, [upPress, students.length]);


    return (
        <div className="result-list">
            <ul>
                {(students || []).map((student, i) => {
                    return (
                        <React.Fragment key={student.id}>
                            <li className={`item ${i === cursor ? "active" : ""}`}
                                onClick={(e: React.SyntheticEvent) => {
                                    setCursor(i)
                                    props.handleSelected && props.handleSelected(student.id)}
                                }
                            >
                                <div>Left</div>
                                <div>{student.first_name} / {student.last_name}</div>
                                <div>Right</div>
                            </li>
                            <li className="divider" ></li>
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    );
};
