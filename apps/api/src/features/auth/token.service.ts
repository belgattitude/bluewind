import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { Result } from '../../core/result';

type TokenPayload = {
    [key: string]: number | string;
};

type DefaultOptions = {
    sign: SignOptions;
    verify: VerifyOptions;
};

type VerifiedToken = {
    iat: number;
    exp: number;
}

export class TokenService {
    private secret: string;
    private defaultOptions: DefaultOptions;
    constructor(secret: string, defaultOptions: DefaultOptions) {
        this.secret = secret;
        this.defaultOptions = defaultOptions;
    }

    /**
     *
     * @param payload
     * @param expiresIn expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js)
     * @param options
     */
    createToken(payload: TokenPayload, expiresIn: string | number, options: SignOptions = {}): string {
        return sign(payload, this.secret, {
            ...this.defaultOptions.sign,
            ...options,
            ...{ expiresIn },
        });
    }

    verify<T extends {[key: string]: string | number}>(token: string, options: VerifyOptions = {}): Result<VerifiedToken & {[P in keyof T]:  P}, Error> {
        try {
            const verified = verify(token, this.secret, {
                ...this.defaultOptions.verify,
                ...options,
            });

            if (typeof verified === 'string' || verified instanceof Error) {
                return Result.fail(new Error(`Unexpected return type as string: ${verified}`));
            }
            return Result.ok(verified as unknown as VerifiedToken & {[P in keyof T]:  P});

        } catch (e) {
            return Result.fail(new Error(`Error: ${e}`));
        }
    }

    static createFormEnv(): TokenService {
        // TODO create real env
        const defaultOptions: DefaultOptions = {
            sign: {
                algorithm: 'HS256',
                expiresIn: 60,
            },
            verify: {
                algorithms: ['HS256'],
            },
        };

        return new TokenService('mySuperSecretJWTKeyForSigningThatImGOnnaPutInEnvLAter', defaultOptions);
    }
}
