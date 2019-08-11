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
        <div style={{ border: '1px solid white' }}>
            {student && (
                <>
                    <div>
                        <h2>
                            {student.first_name}&nbsp;
                            {student.last_name}
                        </h2>
                        {student.email}
                        {student.phone}
                    </div>
                    <table>
                        <thead></thead>
                        <tbody>
                            {student.past_classes.map(classDetail => (
                                <tr key={classDetail.id}>
                                    <td>{classDetail.label}</td>
                                    <td style={{ backgroundColor: 'green' }}>Abo (1/4)</td>
                                    <td>Restant</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button>Add payment</button>
                    <button>Register</button>
                </>
            )}
        </div>
    );
};
