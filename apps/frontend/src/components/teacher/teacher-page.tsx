import React, { useState } from 'react';
import TeacherList from './list/teacher-list';
import TeacherForm from './form/teacher-form';

const TeacherPage: React.FC<{}> = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };
    return (
        <div>
            {open && <TeacherForm />}
            <TeacherList />
            <button
                onClick={() => {
                    toggleOpen();
                }}
                name="create"
            >
                Create
            </button>
        </div>
    );
};

export default TeacherPage;
