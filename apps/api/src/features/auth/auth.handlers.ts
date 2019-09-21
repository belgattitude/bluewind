import { Request, Response } from 'express';
import { LoginRequestDto } from './auth.dto';
import { logger } from '../../logger';
import { GenericDtoMapper } from '../../core/mapper/generic-dto-mapper';
import { sign } from 'jsonwebtoken';
import { addDTOErrorToResponse } from '../../core/utils';
import { AuthService } from './auth.service';
import { AuthRepo } from './auth.repo';
import { DatabaseError } from '../../core/exceptions';

/**
 * Login handler just authenticate credentials
 * and generate a JWT token on success
 */
export const loginHandler = async (req: Request, res: Response) => {
    // Validate input
    const dtoOrError = await GenericDtoMapper.fromRequest(LoginRequestDto, req);
    if (dtoOrError.type === 'failure') {
        addDTOErrorToResponse(res, dtoOrError).send();
        return;
    }

    // Authentication

    const dto = dtoOrError.dto;
    const authService = new AuthService(AuthRepo.fromConnection());

    const result = await authService.authenticateAndReturnUser(dto.username, dto.password);

    const { payload } = result;

    if (payload.isError) {
        if (payload.error instanceof DatabaseError) {
            return res.status(500).send(payload.error.message);
        }
        return res.status(401).send(payload.error.message);
    }

    // Return
    const user = payload.value;
    const validFor = 86400;

    const signedToken = sign({ userId: user.id }, 'MyJWTsecretThatShouldBeSomewhereElse', {
        expiresIn: validFor,
    });

    return res.cookie('token', signedToken, { maxAge: validFor }).json({ success: true, token: signedToken });
};
