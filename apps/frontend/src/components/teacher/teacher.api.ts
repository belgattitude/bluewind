import { CreateTeacherDto } from '@bluewind/api/teacher/dto/create-teacher.dto';

const url = 'http://localhost:3000';

export const fetchTeachers = async () => {
    return fetch(`${url}/teacher`, {
        headers: {
            Accept: 'application/json',
        },
    }).then(response => {
        return response.json();
    });
};

export const createTeacher = async (teacher: CreateTeacherDto) => {
    return fetch(`${url}/teacher`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
    }).then(response => {
        return response.json();
    });
};
