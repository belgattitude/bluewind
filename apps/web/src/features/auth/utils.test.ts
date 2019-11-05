import { JwtPayload } from '../../core/utils/jwt/jwt-parser';
import { getUserIdFromJwtPayload } from './utils';

describe('Auth utils tests', () => {
    it('Should return userId from jwt payload with default sub claim', () => {
        const payload: JwtPayload = { exp: 123, sub: '1234567890' };
        expect(getUserIdFromJwtPayload(payload)).toBe(1234567890);
    });

    it('Should return userId from jwt payload with custom claim', () => {
        const payload: JwtPayload = { exp: 123, user_id: '1234567890' };
        expect(getUserIdFromJwtPayload(payload, 'user_id')).toBe(1234567890);
    });

    it('Should throw an error on missing claim', () => {
        const payload: JwtPayload = { exp: 123 };
        expect(() => {
            getUserIdFromJwtPayload(payload);
        }).toThrow(Error);
    });

    it('Should throw an error on unsupported userId', () => {
        const payload: JwtPayload = { exp: 123, sub: 'Hello' };
        expect(() => {
            getUserIdFromJwtPayload(payload);
        }).toThrow(Error);
    });

    it('Should throw an error on float userId', () => {
        const payload: JwtPayload = { exp: 123, sub: '123.23' };
        expect(() => {
            getUserIdFromJwtPayload(payload);
        }).toThrow(Error);
    });

    it('Should throw an error on negative userId', () => {
        const payload: JwtPayload = { exp: 123, sub: '-10' };
        expect(() => {
            getUserIdFromJwtPayload(payload);
        }).toThrow(Error);
    });
});
