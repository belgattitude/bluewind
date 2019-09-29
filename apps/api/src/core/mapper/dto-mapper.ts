import { ClassType } from 'class-transformer/ClassTransformer';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Result } from '@bluewind/error-flow';

/**
 * A very basic generic mapper relying on class-validator and class-transformer
 * @param dtoClass
 * @param inputData the plainObject
 */
export const getValidatedDto = async <T>(dtoClass: ClassType<T>, inputData: {[key:string]: unknown}): Promise<Result<T>> => {
    // map to plain object
    const dto = plainToClass(dtoClass, inputData, {
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
