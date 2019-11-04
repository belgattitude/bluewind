import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { DatabaseError, DTOValidationError } from '../../exceptions';

export const getHttpErrors = (
    e: Error | DTOValidationError | DatabaseError
): { code: number; message: string; errors?: ValidationError[] } => {
    if (e instanceof DatabaseError) {
        return { code: 500, message: e.message };
    }
    if (e instanceof DTOValidationError) {
        return { code: 400, message: e.message, errors: e.errors };
    }
    return { code: 500, message: e.message };
};

/**
 * Sets validation errors to the express response as json (for now)
 */
export const setHttpErrors = (e: Error, res: Response, code?: number): void => {
    const { code: defaultCode, message, errors } = getHttpErrors(e);
    res.status(code || defaultCode).json({
        code,
        message,
        ...(errors ? { errors } : {}),
    });
};
