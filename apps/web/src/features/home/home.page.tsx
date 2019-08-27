import React, {useState} from 'react';
import './home.scss';
import {StudentList} from "../student/student.list";
import {StudentDetail} from "../student/student.detail";

type Props = {
    children?: never
}

export const HomePage: React.FC<Props> = () => {

    const [studentId, setStudentId] = useState<number | null>(null);

    const handleSearchChange = (query: string) => {
        console.log('THE SEARCH HAVE CHANGED');
        setStudentId(null);
    };

    return (
        <div className="test">
            <div className="test-list">
                <StudentList
                    handleEdit={studentId => setStudentId(studentId)}
                    handleDelete={studentId => {
                        console.log('delete');
                    }}
                    handleSearchChange={handleSearchChange}
                />
            </div>
            <div className="test-detail">
                {studentId &&
                <StudentDetail studentId={studentId}/>
                }
            </div>

        </div>
    );
};
