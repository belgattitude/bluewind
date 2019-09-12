import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';
import { LoginRequestDto } from './auth.dto';
import { compareSync } from 'bcryptjs';
import { logger } from '../../logger';
import { GenericDtoMapper } from '../../common/generic-dto-mapper';
import { sign } from 'jsonwebtoken';
import { addDTOErrorToResponse } from '../../common/utils';

/**
 * Login handler just authenticate credentials
 * and generate a JWT token on success
 */
export const loginHandler = async (req: Request, res: Response) => {
    // Get a validated LoginRequestDTO from express request
    // Could be handled differently... just an example using
    // discriminated unions type safety to handle validation.

    const dtoOrError = await GenericDtoMapper.fromRequest(LoginRequestDto, req);
    if (dtoOrError.type === 'failure') {
        addDTOErrorToResponse(res, dtoOrError).send();
        return;
    }

    const dto = dtoOrError.dto;

    // Should be done in a separate service...

    try {
        const userRepository = getRepository(UserEntity);
        const user = await userRepository.findOneOrFail({
            where: { username: dto.username },
        });

        if (await compareSync(dto.password, user.password)) {
            // Should make specific service for JWT and use passport
            // This is just a basic example
            const signedToken = sign(
                { userId: user.id, username: user.username },
                'MyJWTsecretThatShouldBeSomewhereElse',
                { expiresIn: '1h' },
            );

            // Send the in cookies and body as examples
            res.cookie('token', signedToken, { maxAge: 86400 }).json({ success: true, token: signedToken });
        } else {
            logger.info(`Login error for user ${dto.password}, invalid credentials`);
            res.status(400).json({ success: false, message: 'invalid credentials' });
        }
    } catch (error) {
        // Error handling definitely needs more love
        res.status(400).send(error.toString());
    }
};
