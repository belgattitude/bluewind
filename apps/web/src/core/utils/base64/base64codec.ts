/**
 * Base64Codec with unicode (UTF-16) support.
 * Solution taken from
 * @link https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */

export class Base64Codec {
    static encode(str: string): string {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
                return String.fromCharCode((('0x' + p1) as unknown) as number);
            })
        );
    }

    static decode(str: string): string {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(
            atob(str)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
    }
}
