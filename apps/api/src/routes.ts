import { loginHandler } from './features/auth/auth.handlers';
import { searchStudents } from './features/student/student.handlers';
import { getProfileHandler } from './features/user/user.handlers';
import { NextFunction, Request, Response, Router } from 'express';

// Next to do make a real middleware for this
type RequestWithToken = {
    token?: string;
} & Request;
const authMiddleware = (req: RequestWithToken, res: Response, next: NextFunction) => {
    console.log(req.query.token);
    if (req.query.token === 'cool') {
        Object.assign(req, { userId: 1 });
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
        router.get('/status', (req, res) => {
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
        apiRouter.get('/api/student', searchStudents);
        router.use(apiRouter);

        return router;
    };
    return createRoutesFromContainer;
}
