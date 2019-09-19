import { Response } from 'express';
import { DTOValidationFailure } from './mapper/generic-dto-mapper';

/**
 * Add dto validation errors to response
 */
export function addDTOErrorToResponse(res: Response, validationFailure: DTOValidationFailure): Response {
    const fields: unknown[] = [];
    validationFailure.fields.map(value => {
        fields.push({ field: value.property, constraints: value.constraints });
    });
    res.status(400);
    res.json({
        success: false,
        message: validationFailure.message,
        fields,
    });
    return res;
}
