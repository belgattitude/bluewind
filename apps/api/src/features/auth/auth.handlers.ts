import { CookieOptions, Request, Response, Router } from 'express';
import { LoginRequestDto } from './auth.dto';
import { getValidatedDto } from '../../core/mapper/dto-mapper';
import { AuthService } from './auth.service';
import { AuthRepo } from './auth.repo';
import { DatabaseError } from '../../core/exceptions';
import { createRefreshTokenService, createTokenService } from './token.service';
import { setHttpErrors } from '../../core/infra/http/error-utils';
import is from '@sindresorhus/is';
import { assertIsSafeId } from '../../core/typeguards';

/**
 * Login handler just authenticate credentials
 * and generate a JWT token on success
 */
export const loginHandler = async (req: Request, res: Response): Promise<void> => {
    // Validate input

    const { payload: dtoRs } = await getValidatedDto(LoginRequestDto, req.body);
    if (dtoRs.isError) {
        return setHttpErrors(dtoRs.error, res, 401);
    }

    const { username, password } = dtoRs.value;

    // Authentication
    const authService = new AuthService(AuthRepo.fromConnection());

    const result = await authService.authenticate(username, password);

    const { payload } = result;

    if (payload.isError) {
        if (payload.error instanceof DatabaseError) {
            res.status(500).send(payload.error.message);
            return;
        }
        res.status(401).send({ message: payload.error.message });
        return;
    }

    const user = payload.value;

    // Put in env later on or better refactor !
    const tokenValidity = 60;
    const refreshTokenValidity = 86400;

    // Regular token
    const token = createTokenService().createToken(
        {
            sub: user.id.toString(10),
        },
        tokenValidity
    );

    // refresh token (use in secure session)
    const refreshToken = createRefreshTokenService().createToken(
        {
            sub: user.id.toString(10),
        },
        refreshTokenValidity
    );

    const cookieOptions: CookieOptions = {
        sameSite: true,
        // make the remember me later
        maxAge: refreshTokenValidity * 1000,
        httpOnly: true,
        // @todo when env is done
        //secure: true,
    };

    res.cookie('refresh-token', refreshToken, cookieOptions).json({ success: true, token: token });
};

export const refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies['refresh-token'] || '';
    if (refreshToken === '') {
        res.status(401).send({ message: 'Refresh token is required' });
    }

    const { payload } = createRefreshTokenService().verify<{ sub: string }>(refreshToken);
    if (payload.isError) {
        res.status(401).send({ message: `Error ${payload.error.message}` });
        return;
    }
    const { sub } = payload.value;
    const userId = typeof sub === 'string' && sub.match(/^\d+$/) ? Number.parseInt(payload.value.sub, 10) : null;

    // Here we can check a lot -> db, token revocation list...
    // let's make it simple for now.

    if (!assertIsSafeId(userId) || userId < 1) {
        res.status(401).send({ message: `Invalid payload in refresh token.` });
        return;
    }

    const tokenValidity = 60;
    // the new token
    const token = createTokenService().createToken(
        {
            sub: userId.toString(10),
        },
        tokenValidity
    );

    res.json({ success: true, token: token });
};
