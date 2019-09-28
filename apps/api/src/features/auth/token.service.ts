import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import {Result} from '@bluewind/error-flow';
import is from '@sindresorhus/is';

type TokenPayload = {
    [key: string]: number | string;
};

type DefaultOptions = {
    sign: SignOptions;
    verify: VerifyOptions;
};

type DecodedToken = {
    iat: number;
    exp: number;
};

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

    verify<T extends {}>(token: string, options: VerifyOptions = {}): Result<DecodedToken & T, Error> {
        try {
            const decoded = verify(token, this.secret, {
                ...this.defaultOptions.verify,
                ...options,
            });
            if (!TokenService.isDecodedToken(decoded)) {
                return Result.fail(new Error(`jsonwbtoken returned an unexpected decoded token: ${decoded}`));
            }
            return Result.ok(decoded as DecodedToken & T);
        } catch (e) {
            return Result.fail(new Error(`Error: ${e}`));
        }
    }

    static isDecodedToken(decoded: unknown): decoded is DecodedToken {
        return is.plainObject(decoded) && is.number(decoded.iat) && is.number(decoded.exp);
    }

    static createFromEnv(): TokenService {
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
