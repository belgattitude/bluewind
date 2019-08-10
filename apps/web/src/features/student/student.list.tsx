import React, { useEffect, useState } from 'react';
import { apiFetchStudents, StudentDetailDTO, StudentListDTO } from './student.api';

type StudentListProps = {
    handleEdit: (studentId: number) => void;
    handleDelete: (studentId: number) => void;
    handleSearchChange: (query: string) => void;
};

export const StudentList: React.FC<StudentListProps> = props => {
    const [query, setQuery] = useState<string>('');
    const [studentList, setStudentList] = useState<StudentListDTO>([]);

    useEffect(() => {
        props.handleSearchChange(query);
        apiFetchStudents({
            query: query,
        }).then(response => {
            setStudentList(response);
        });
    }, [query]);

    return (
        <div>
            <div>Student list</div>
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} />
            <div>
                {studentList.map(student => {
                    return (
                        <div key={student.id}>
                            <span>{student.first_name}</span>
                            <span>{student.last_name}</span>
                            <button onClick={_ => props.handleEdit(student.id)}>edit</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};