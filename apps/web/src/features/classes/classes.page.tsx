import React, { useState } from 'react';
import { ClassesList } from './classes.list';

export const ClassesPage: React.FC = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const handleRegistration = (classId: number) => {
        alert('cool');
    };

    return (
        <div>
            <div>Classes</div>
            <ClassesList
                handleEdit={classId => {
                    setSelected(classId);
                }}
                handleRegister={classId => {
                    handleRegistration(classId);
                }}
            />

            <div>Upcoming classes</div>
            <div>Past classes</div>
        </div>
    );
};
