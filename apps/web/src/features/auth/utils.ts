import { JwtPayload } from '../../core/utils/jwt/jwt-parser';

/**
 * @throws {Error} if userId cannot be retrieved from payload
 */
export const getUserIdFromJwtPayload = (payload: JwtPayload, claim = 'sub'): number => {
    if (!(claim in payload)) {
        throw new Error(`Claim ${claim} does not exists in payload`);
    }
    const decoded = payload[claim];

    let value;
    if (typeof decoded === 'string' && decoded.match('^\\d+$')) {
        value = Number.parseInt(decoded, 10);
    } else if (typeof decoded === 'number') {
        value = decoded;
    }
    if (value === undefined || Number.isNaN(value)) {
        throw new Error('Sub claim is undefined or not a valid number');
    }
    if (!Number.isSafeInteger(value) || value < 0) {
        throw new Error(`Unsupported userId in sub claim: ${value}`);
    }
    return value;
};
