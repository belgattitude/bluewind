import { NextFunction, Response, Request } from 'express';
import { TokenService } from './token.service';

type RequestWithToken = {
    token?: string;
} & Request;

export const authMiddleware = (req: RequestWithToken, res: Response, next: NextFunction): void => {
    const token = (req.headers.authorization || '').replace(/^bearer\ /i, '');

    const tokenService = TokenService.createFromEnv();

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
