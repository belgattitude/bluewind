import React, {useEffect, useRef, useState} from 'react';
import './home.scss';
import {StudentList} from "../student/student.list";
import {StudentDetail} from "../student/student.detail";
import {StudentApi, StudentDetailDTO, StudentListDTO} from "../student/student.api";
import {useDebouncedCallback} from "use-debounce";

type Props = {
    timeout: number,
    children?: never
}

const studentApi = new StudentApi();

const HomePage: React.FC<Props> = (props) => {

    const [studentId, setStudentId] = useState<number | null>(null);
    const [query, setQuery] = useState<string | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const [debouncedCallback] = useDebouncedCallback(
        (query) => {
            setQuery(query);
        },
        props.timeout
    );

    const [studentList, setStudentList] = useState<StudentDetailDTO[]>([]);

    useEffect(() => {
        if (searchRef && searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    useEffect(() => {
        studentApi.getStudents({query: query || undefined}).then(response => {
            setStudentList(response);
        })
    }, [query]);

    return (
        <div className="test">
            <div className={"test-search"}>
                <input type="search"
                       ref={searchRef}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               console.log('selected');
                           }
                       }}
                       onChange={(e) => {
                           debouncedCallback(e.currentTarget.value);
                       }}
                />
            </div>
            <div className="result-wrapper">
                <div className="test-list">
                    <StudentList students={studentList}
                                 handleSelected={(studentId: number) => {
                                     setStudentId(studentId);
                                 }}
                    />
                </div>
                <div className="test-detail">
                    {studentId &&
                        <StudentDetail studentId={studentId}/>
                    }
                </div>
            </div>
        </div>
    );
};

HomePage.defaultProps = {
    timeout: 150
};

export default HomePage;
