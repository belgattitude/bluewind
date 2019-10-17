import React, { useEffect, useState } from 'react';
import { StudentDetailDTO } from './student.api';
import { useKeyPress } from '../../core/hooks/use-key-press';
import styled from '@emotion/styled';

type StudentListProps = {
    students: StudentDetailDTO[];
    handleEdit?: (studentId: number) => void;
    handleDelete?: (studentId: number) => void;
    handleSearchChange?: (query: string) => void;
    handleSelected?: (studentId: number) => void;
    className?: string;
};

const UnstyledStudentList: React.FC<StudentListProps> = props => {
    const { students } = props;
    const [cursor, setCursor] = useState<number>(0);
    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const [hovered, setHovered] = useState(undefined);

    useEffect(() => {
        if (downPress) {
            setCursor(prevState => (prevState < students.length - 1 ? prevState + 1 : 0));
        }
    }, [downPress, students.length]);

    useEffect(() => {
        if (upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : students.length - 1));
        }
    }, [upPress, students.length]);

    return (
        <div className={props.className}>
            <ul>
                {(students || []).map((student, i) => {
                    const cls = i === cursor ? 'item__active' : 'item';
                    return (
                        <React.Fragment key={student.id}>
                            <li
                                className={cls}
                                role={'button'}
                                onPointerDown={e => {
                                    setCursor(i);
                                    props.handleSelected && props.handleSelected(student.id);
                                }}
                            >
                                <div>Left</div>
                                <div>
                                    {student.first_name} / {student.last_name}
                                </div>
                                <div>Right</div>
                            </li>
                            <li className="divider" />
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

// Clean up this mess !!!
export const StudentList = styled(UnstyledStudentList)`
    ul {
        margin: 0;
        padding: 0;
        padding-top: 8px;
        padding-bottom: 8px;
        position: relative;
        list-style: none;
        background-color: white;

        li {
            padding-left: 16px;
            padding-right: 16px;
            text-decoration: none;
            display: flex;

            &.item,
            &.item__active {
                align-items: flex-start;
                width: 100%;
                position: relative;
                box-sizing: border-box;
                text-align: left;
                padding-top: 8px;
                padding-bottom: 8px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                border: 1px solid white;
                div {
                    padding: 5px;
                    &:first-of-type {
                        border: 1px solid blue;
                        border-radius: 100%;
                        width: 30px;
                        overflow: hidden;
                        margin-right: 5px;
                    }
                    &:nth-of-type(2) {
                        flex-grow: 1;
                    }
                    &:last-of-type {
                        overflow: hidden;
                        max-width: 30px;
                    }
                }
            }
            &.item__active {
                //border: 1px solid blue;
                background-color: rgba(0, 0, 200, 0.1);
            }

            &.divider {
                border: none;
                height: 1px;
                margin: 0;
                flex-shrink: 0;
                background-color: rgba(0, 0, 0, 0.12);
            }
        }
    }
`;
