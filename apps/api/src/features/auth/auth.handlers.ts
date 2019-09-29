import { Request, Response, Router } from 'express';
import { LoginRequestDto } from './auth.dto';
import { logger } from '../../logger';
import { getValidatedDto} from '../../core/mapper/dto-mapper';
import { AuthService } from './auth.service';
import { AuthRepo } from './auth.repo';
import { DatabaseError } from '../../core/exceptions';
import { TokenService } from './token.service';
import {setHttpErrors} from "../../core/http/error-utils";

/**
 * Login handler just authenticate credentials
 * and generate a JWT token on success
 */
export const loginHandler = async (req: Request, res: Response) => {
    // Validate input

    const { payload: dtoRs } = await getValidatedDto(LoginRequestDto, req.body);
    if (dtoRs.isError) {
        return setHttpErrors(dtoRs.error, res);
    }

    const {username, password} = dtoRs.value;

    // Authentication

    const authService = new AuthService(AuthRepo.fromConnection());

    const result = await authService.authenticate(username, password);

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

    const tokenService = TokenService.createFromEnv();

    const signed = tokenService.createToken(
        {
            userId: user.id,
        },
        validFor
    );

    return res.cookie('token', signed, { maxAge: validFor }).json({ success: true, token: signed });
};

export const refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {};
