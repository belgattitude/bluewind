import { JwtParser } from './jwt-parser';

describe('JWTParser tests', () => {
    it('Should return payload on valid token', () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const payload = JwtParser.getPayload(token);
        expect(payload).toBe({
            sub: '1234567890',
            name: 'John Doe',
            iat: 1516239022,
        });
    });

    it('Should throw SyntaxError on non base-64 token', () => {
        expect(() => {
            JwtParser.getPayload('HEADER.PAYLOAD.HASH');
        }).toThrow(SyntaxError);
    });

    it('Should throw Error on invalid token', () => {
        expect(() => {
            JwtParser.getPayload('MYINVALIDTOKEN');
        }).toThrow(Error);

        expect(() => {
            JwtParser.getPayload('...');
        }).toThrow(Error);
    });
});
