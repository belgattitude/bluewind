import { loginHandler, refreshTokenHandler } from './features/auth/auth.handlers';
import {
    CreateStudentHandler,
    DeleteStudentHandler,
    GetStudentHandler,
    SearchStudentsHandler,
    UpdateStudentHandler,
} from './features/student/student.handlers';
import { getProfileHandler } from './features/user/user.handlers';
import { Request, Response, Router } from 'express';

import StudentService, {IStudentService} from './features/student/student.service';
import { authMiddleware } from './features/auth/auth.middleware';
import DependencyContainer from "tsyringe/dist/typings/types/dependency-container";

export function getMainRouterCreator(): (container: DependencyContainer) => Router {
    return (container: DependencyContainer): Router => {
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
        apiRouter.get('/api/students', container.resolve(SearchStudentsHandler).execute);
        apiRouter.post('/api/students', container.resolve(CreateStudentHandler).execute);
        apiRouter.put('/api/students/:id', container.resolve(UpdateStudentHandler).execute);
        apiRouter.get('/api/students/:id', container.resolve(GetStudentHandler).execute);
        apiRouter.delete('/api/students/:id', container.resolve(DeleteStudentHandler).execute);

        router.use(apiRouter);

        return router;
    };
}
