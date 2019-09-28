import { Request, Response } from 'express';
import { DatabaseError } from '../exceptions';
import { ValidationError } from 'class-validator';

export const getHttpErrors = (
    e: Error
): { code: number; message: string; constraints?: ValidationError['constraints'] } => {
    if (e instanceof DatabaseError) {
        return { code: 500, message: e.message };
    }
    if (e instanceof ValidationError) {
        return { code: 400, message: e.message, constraints: e.constraints };
    }
    return { code: 500, message: e.message };
};

/**
 * Sets validation errors to the express response as json (for now)
 */
export const setHttpErrors = (e: Error, res: Response): void => {
    const { code, message, constraints } = getHttpErrors(e);
    res.status(code).json({
        code,
        message,
        ...(constraints ? { constraints } : {}),
    });
};
