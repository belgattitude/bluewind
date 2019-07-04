import React from 'react';
import TeacherList from './list/teacher-list';
import TeacherForm from './form/teacher-form';

const TeacherPage: React.FC<{}> = () => {
    return (
        <div>
            <TeacherForm />
            <TeacherList />
        </div>
    );
};

export default TeacherPage;
