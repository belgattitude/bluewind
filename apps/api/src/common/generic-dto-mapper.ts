import { ClassType } from 'class-transformer/ClassTransformer';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';

interface DTOValidationSuccess<T> {
    type: 'success';
    dto: T;
}

export interface DTOValidationFailure {
    type: 'failure';
    message: string;
    fields: ValidationError[];
}

// Discriminated union
type DTOValidationResult<T> = DTOValidationSuccess<T> | DTOValidationFailure;

/**
 * On the fly experiment
 */
export class GenericDtoMapper {
    /**
     * Return a validated DTO from express request.body
     */
    static async fromRequest<T>(
        obj: ClassType<T>,
        req: Request,
        options?: ValidatorOptions,
    ): Promise<DTOValidationResult<T>> {
        if (!('body' in req)) {
            return {
                type: 'failure',
                message: 'Requires body-parser.json() middleware.',
                fields: [],
            };
        }

        const dto = plainToClass(obj, req.body);
        try {
            await validateOrReject(dto, options);
        } catch (errors) {
            return {
                type: 'failure',
                message: 'Invalid or missing parameters in request',
                fields: errors,
            };
        }

        return {
            type: 'success',
            dto,
        };
    }
}
