import { Request, Response } from 'express';
import { getHttpErrors } from './error-utils';

export abstract class ExpressHandler {
    protected req!: Request;
    protected res!: Response;

    execute = (req: Request, res: Response): void => {
        this.req = req;
        this.res = res;
        try {
            this.executeImpl();
        } catch (e) {
            // Eventually a global logger here
            const { code, message, errors } = getHttpErrors(e);
            res.status(code).json({ message: message, errors });
        }
    };

    protected abstract async executeImpl(): Promise<void>;
}
