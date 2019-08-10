import React, { useState } from 'react';
import { StudentList } from './student.list';
import useReactRouter from 'use-react-router';
import { StudentDetail } from './student.detail';

export const StudentPage: React.FC = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const { history } = useReactRouter();

    const handleSearchChange = (query: string) => {
        console.log('THE SEARCH HAVE CHANGED');
        setSelected(null);
    };

    return (
        <div>
            <StudentList
                handleEdit={student => setSelected(student)}
                handleDelete={student => {
                    console.log('delete');
                }}
                handleSearchChange={handleSearchChange}
            />
            {selected && <StudentDetail studentId={selected} />}
        </div>
    );
};
