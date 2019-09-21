import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger } from './logger';
import { initConnection } from './init-connection';
import swaggerUi from 'swagger-ui-express';
import * as swaggerConfig from './swagger.json';
import { loginHandler } from './features/auth/auth.handlers';
import { env } from './env';
import { studentRequestHandler } from './features/student/student.handler';
import {getProfileHandler} from "./features/user/user.handlers";

const port: number = env.DEVSERVER_PORT;

initConnection()
    .then(async connection => {
        const app: express.Application = express();

        // Middleware registration
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

        // Routes, should be in a separate file (router)

        app.post('/auth/login', loginHandler);
        app.get('/student/search', studentRequestHandler);

        // There should be a middleware @todo jwt...
        app.get('/profile/me', getProfileHandler);

        app.get('/', (req: Request, res: Response) => {
            res.redirect('/swagger');
        });

        // Start the server
        app.listen(port, () => {
            logger.info(`Listening at http://localhost:${port}/.`);
        });
    })
    .catch(error => {
        logger.error(`Could not start the server on port ${port}`);
        console.error(error);
    });
