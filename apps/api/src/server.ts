import 'reflect-metadata';
import { logger } from './logger';
import { initConnection } from './init-connection';
import { env } from './env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerConfig from './swagger.json';
import { getMainRouterCreator } from './routes';

const port: number = env.DEVSERVER_PORT;

initConnection()
    .then(async connection => {
        const app: express.Application = express();

        // Middleware registration
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

        // @TODO here we'll load the global config
        // or use context... TBD
        const container = {};

        app.use(getMainRouterCreator()(container));

        // Start the server
        app.listen(port, () => {
            logger.info(`Listening at http://localhost:${port}/.`);
        });
    })
    .catch(error => {
        logger.error(`Could not start the server on port ${port}`);
        console.error(error);
    });
