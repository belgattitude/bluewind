import React, { useEffect, useState } from 'react';
import { apiFetchClasses, ClassesListDTO } from './classes.api';
import { formatWithOptions } from 'date-fns/fp';
import { fr } from 'date-fns/locale';

const dateToString = formatWithOptions({ locale: fr }, 'dd MM yyyy HH:mm');

type ClassesListProps = {
    handleEdit: (classId: number) => void;
    handleRegister: (classId: number) => void;
};

export const ClassesList: React.FC<ClassesListProps> = props => {
    const [classes, setClasses] = useState<ClassesListDTO>([]);

    useEffect(() => {
        apiFetchClasses().then(response => {
            setClasses(response);
        });
    }, []);

    return (
        <div>
            <h1>Upcoming classes</h1>
            <table style={{ border: '1px solid white' }}>
                <thead>
                    <th>Start</th>
                    <th>Label</th>
                    <th>Level</th>
                    <th>Status</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {classes.map(classDetail => (
                        <tr key={classDetail.id}>
                            <td>{dateToString(classDetail.start_date)}</td>
                            <td>{classDetail.label}</td>
                            <td>{classDetail.level}</td>
                            <td>{classDetail.status}</td>
                            <td>
                                <button onClick={_ => props.handleEdit(classDetail.id)}>Edit</button>
                                <button onClick={_ => props.handleRegister(classDetail.id)}>Register</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
