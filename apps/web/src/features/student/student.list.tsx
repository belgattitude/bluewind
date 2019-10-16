import React, { useEffect, useState } from 'react';
import { StudentDetailDTO } from './student.api';
import { useKeyPress } from '../../core/hooks/use-key-press';

type StudentListProps = {
    students: StudentDetailDTO[];
    handleEdit?: (studentId: number) => void;
    handleDelete?: (studentId: number) => void;
    handleSearchChange?: (query: string) => void;
    handleSelected?: (studentId: number) => void;
};

export const StudentList: React.FC<StudentListProps> = props => {
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
        <div className="result-list">
            <ul>
                {(students || []).map((student, i) => {
                    return (
                        <React.Fragment key={student.id}>
                            <li
                                className={`item ${i === cursor ? 'active' : ''}`}
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
                            <li className="divider"></li>
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};
