import { loginHandler, refreshTokenHandler } from './features/auth/auth.handlers';
import {
    createStudent,
    deleteStudent,
    getStudent,
    searchStudents,
    updateStudent,
} from './features/student/student.handlers';
import { getProfileHandler } from './features/user/user.handlers';
import { Request, Response, Router } from 'express';

import StudentService from './features/student/student.service';
import { authMiddleware } from './features/auth/auth.middleware';

export function getMainRouterCreator(): (container: {}) => Router {
    return (container: {}): Router => {
        const router = Router();

        /**
         * Standard routes
         */
        router.get('/status', (req: Request, res: Response) => {
            res.status(200).json({ ack: new Date().toISOString() });
        });

        /**
         * Authentication related routes
         */
        router.post('/auth/login', loginHandler);
        router.get('/auth/refresh-token', refreshTokenHandler);

        /**
         * API related routes (/api)
         */
        const apiRouter = Router();
        apiRouter.use(authMiddleware);
        apiRouter.get('/api/profile', getProfileHandler);

        /**
         * API students routes
         */
        apiRouter.get('/api/students', searchStudents(new StudentService()));
        apiRouter.post('/api/students/:id', createStudent);
        apiRouter.get('/api/students/:id', getStudent);
        apiRouter.put('/api/students/:id', updateStudent);
        apiRouter.delete('/api/students/:id', deleteStudent);

        router.use(apiRouter);

        return router;
    };
}
