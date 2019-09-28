import { ClassType } from 'class-transformer/ClassTransformer';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';
import {Result} from '@bluewind/error-flow';

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
export class DtoMapper {
    /**
     * @throws Error
     */
    static extractParamsFromRequest(req: Request): { [key: string]: unknown } {
        const { method } = req;
        switch (method.toUpperCase()) {
            case 'GET':
                return req.query || {};
            case 'POST':
            case 'PUT':
                if (!('body' in req)) {
                    throw new Error(`DtoMapper requires body-parser.json() middleware.`);
                }
                return req.body || {};
            default:
                throw new Error(`DtoMapper only supports GET/POST/PUT for now.`);
        }
    }

    /**
     * Return a validated DTO from express request.body
     */
    static async fromRequest<T>(
        obj: ClassType<T>,
        req: Request,
        options?: ValidatorOptions,
    ): Promise<DTOValidationResult<T>> {
        const data = DtoMapper.extractParamsFromRequest(req);

        const dto = plainToClass(obj, data, {
            // excludeExtraneousValues: true, // only if you use @Expose
        });
        const defaultOptions = {
            skipUndefinedProperties: true,
            skipNullProperties: false,
            skipMissingProperties: false,
        };
        try {
            await validateOrReject(dto, { ...defaultOptions, ...options });
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

export const getValidatedDto = async <T>(obj: ClassType<T>, input: unknown): Promise<Result<T>> => {
    // map to plain object
    const dto = plainToClass(obj, input, {
        enableImplicitConversion: true,
    });
    // validation based on DTO decorators
    const errors = await validate(dto, {
        skipNullProperties: true,
        skipUndefinedProperties: true,
    });
    if (errors.length > 0) {
        return Result.fail(`Validation failed ${JSON.stringify(errors)}`);
    }
    return Result.ok(dto);
};
