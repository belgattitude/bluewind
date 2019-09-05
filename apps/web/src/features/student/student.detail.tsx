import React, { useEffect, useState } from 'react';
import {StudentApi, StudentDetailDTO, StudentListDTO, studentApi} from './student.api';
import {StudentForm} from "./student.form";


type StudentDetailProps = {
    studentId: number;
};

export const StudentDetail: React.FC<StudentDetailProps> = props => {
    const [student, setStudent] = useState<StudentDetailDTO | null>(null);

    useEffect(() => {
        studentApi.getStudent(props.studentId).then(response => {
            console.log('RESPONSE STUDENT', response)
            setStudent(response);
        })
    }, [props.studentId]);

    return (
        <div >
            {student && (
                <>
                    <StudentForm data={student}/>
                    <div>
                        <h1>
                            {student.id}
                        </h1>
                        <h2>
                            Name: {student.first_name}&nbsp;
                            {student.last_name}
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
