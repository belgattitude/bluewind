import { loginHandler } from './features/auth/auth.handlers';
import {
    createStudent,
    deleteStudent,
    getStudent,
    searchStudents,
    updateStudent,
} from './features/student/student.handlers';
import { getProfileHandler } from './features/user/user.handlers';
import { NextFunction, Request, Response, Router } from 'express';
import { TokenService } from './features/auth/token.service';
import StudentService from './features/student/student.service';

// Next to do make a real middleware for this
type RequestWithToken = {
    token?: string;
} & Request;
const authMiddleware = (req: RequestWithToken, res: Response, next: NextFunction): void => {
    const token = (req.headers.authorization || '').replace(/^bearer\ /i, '');

    const tokenService = TokenService.createFormEnv();

    type ExtraTokenValues = {
        userId: number;
    };

    if (token) {
        const result = tokenService.verify<ExtraTokenValues>(token);
        const { payload } = result;
        if (payload.isError) {
            res.status(401).json(`Authentication failure ${payload.error.message}`);
            return;
        }
        Object.assign(req, { userId: payload.value.userId });
        next();
    } else {
        res.status(401).json('Authentication failure');
    }
};

export function getMainRouterCreator(): (container: {}) => Router {
    const createRoutesFromContainer = (container: {}): Router => {
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

    return createRoutesFromContainer;
}
