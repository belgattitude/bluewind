import { Base64Codec } from './base64codec';

describe('Base64Codec tests', () => {
    it('Should support utf16 strings', () => {
        const utf16Str = '✓ à la mode';
        const encoded = Base64Codec.encode(utf16Str);
        expect(encoded).toEqual('4pyTIMOgIGxhIG1vZGU=');
        const decoded = Base64Codec.decode(encoded);
        expect(decoded).toEqual(utf16Str);
    });
});
