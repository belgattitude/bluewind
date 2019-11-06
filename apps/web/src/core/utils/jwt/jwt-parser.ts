import { Base64Codec } from '../base64/base64codec';

export type JwtPayload = {
    iss?: string;
    sub?: string;
    aud?: string;
    exp: number;
    [k: string]: string | number | undefined;
};

export class JwtParser {
    /**
     * @throws {Error} if token payload is empty
     * @throws {SyntaxError} if token cannot be parsed (invalid json)
     */
    static getPayload(token: string): JwtPayload {
        const parts = token.split('.');
        const base64 = typeof parts[1] === 'string' && parts[1].length > 0 ? parts[1] : null;
        if (base64 === null) {
            throw new Error('Invalid token, payload cannot be determined');
        }
        return JSON.parse(Base64Codec.decode(base64));
    }
}
