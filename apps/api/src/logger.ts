import { createLogger, format, transports } from 'winston';
const { File, Console } = transports;

const fileFormat = format.combine(format.timestamp(), format.json());

const wintstonLogger = createLogger({
    level: 'info',
    transports: [
        new File({ filename: './logs/error.log', format: fileFormat, level: 'error' }),
        new File({ filename: './logs/combined.log', format: fileFormat }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    const errorStackFormat = format(info => {
        if (info.stack) {
            // tslint:disable-next-line:no-console
            console.log(info.stack);
            return false;
        }
        return info;
    });
    const consoleTransport = new Console({
        format: format.combine(format.colorize(), format.simple(), errorStackFormat()),
    });
    wintstonLogger.add(consoleTransport);
}

// Export logger
export const logger = wintstonLogger;
