import { LoggerFactory } from './logger';

const logger = LoggerFactory.getLogger();

export const ErrorHandler = (error: Error, componentStack: string) => {
    // Do something with the error
    // E.g. log to an error logging client here
    logger.error(error);
};
