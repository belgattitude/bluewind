import React, {useCallback, useEffect, useState} from 'react';
import { StudentApi,StudentListDTO} from './student.api';

type StudentListProps = {
    handleEdit: (studentId: number) => void;
    handleDelete: (studentId: number) => void;
    handleSearchChange: (query: string) => void;
};
const studentApi = new StudentApi();

export const StudentList: React.FC<StudentListProps> = props => {
    const [query, setQuery] = useState<string>('');
    const [studentList, setStudentList] = useState<StudentListDTO>([]);
    useEffect(() => {
        studentApi.getStudents({query: query}).then(response => {
            setStudentList(response);
        })
    }, [query]);

    return (
        <div>
            <div>Student list</div>
            <input type="search" value={query} onChange={event => {
                const query = event.target.value;
                props.handleSearchChange(query);
                setQuery(query);
            }} />
            <div>
                {studentList.map(student => {
                    return (
                        <div key={student.id}>
                            <span>{student.firstName}</span>
                            <span>{student.lastName}</span>
                            <button onClick={_ => props.handleEdit(student.id)}>edit</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
