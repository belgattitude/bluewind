import React, { useEffect, useState } from 'react';
import { StudentApi, IStudentDetailDTO, StudentListDTO} from './student.api';
const studentApi = new StudentApi();

type StudentDetailProps = {
    studentId: number;
};

export const StudentDetail: React.FC<StudentDetailProps> = props => {
    const [student, setStudent] = useState<IStudentDetailDTO | null>(null);

    useEffect(() => {
        studentApi.getStudent(props.studentId).then(response => {
            console.log('RESPONSE STUDENT', response)
            setStudent(response);
        })
    }, [props.studentId]);

    return (
        <div style={{ border: '1px solid white' }}>
            {student && (
                <>
                    <div>
                        <h1>
                            {student.id}
                        </h1>
                        <h2>
                            Name: {student.firstName}&nbsp;
                            {student.lastName}
                        </h2>
                        {student.email}
                        {student.phone}
                    </div>
                    <table>
                        <thead></thead>
                        <tbody>
                            {student.pastClasses && student.pastClasses.map(classDetail => (
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
