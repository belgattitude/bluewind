import React, { useEffect, useState } from 'react';
import { apiFetchStudent, apiFetchStudents, StudentDetailDTO, StudentListDTO } from './student.api';

type StudentDetailProps = {
    studentId: number;
};

export const StudentDetail: React.FC<StudentDetailProps> = props => {
    const [student, setStudent] = useState<StudentDetailDTO | null>(null);

    useEffect(() => {
        apiFetchStudent(props.studentId).then(response => {
            setStudent(response);
        });
    }, [props.studentId]);

    return (
        <div>
            <div>Student detail</div>
            <div>{props.studentId}</div>
            {student && (
                <div>
                    {student.first_name}
                    {student.last_name}
                    {student.email}
                    {student.phone}
                </div>
            )}
        </div>
    );
};
