import React from 'react';
import StudentList from '../components/student-list/student-list';
import TeacherPage from '../components/teacher/teacher-page';
import { Home, Person, Class } from '@material-ui/icons';

export interface AppRouteProps {
    path: string;
    exact?: boolean;
    label: string;
    main: React.FC;
    icon?: any;
}

export const appRoutes: AppRouteProps[] = [
    {
        path: '/',
        exact: true,
        label: 'Home',
        main: () => <h2>Home</h2>,
        icon: () => <Home />,
    },
    {
        path: '/student',
        label: 'Student',
        main: () => <StudentList />,
        icon: () => <Person />,
    },
    {
        path: '/teacher',
        label: 'Teacher',
        main: () => <TeacherPage />,
        icon: () => <Class />,
    },
];
