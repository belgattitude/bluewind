import * as log from 'loglevel';

export class LoggerFactory {
    static getLogger(): log.Logger {
        return log;
    }
}
