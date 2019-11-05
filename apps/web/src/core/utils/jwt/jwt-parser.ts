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
     * @throws {SyntaxError} if token cannot be parsed (invalid json)
     */
    static getPayload(token: string): JwtPayload {
        const base64 = token.split('.')[1];
        return JSON.parse(Base64Codec.decode(base64));
    }
}
