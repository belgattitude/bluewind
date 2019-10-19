import ky from 'ky';
import { getTokenStore, ITokenStore } from '../token-store';
import { Result } from '@bluewind/error-flow';
import is from '@sindresorhus/is';

const defaultPrefix = 'http://localhost:3000';

type RefreshTokenServiceProps = {
    refreshTokenUrl: string;
    tokenStore: ITokenStore;
};

export interface IRefreshTokenService {
    /**
     * @param refreshToken Should be undefined, refresh token must be stored as http-only cookies.
     */
    getAccessToken(refreshToken?: string): Promise<Result<string>>;
}

export class RefreshTokenService implements IRefreshTokenService {
    readonly props: RefreshTokenServiceProps;

    constructor(props: RefreshTokenServiceProps) {
        this.props = props;
    }

    /**
     * Return a newly created access token assuming your
     * refresh token is stored as an http-only cookie
     */
    async getAccessToken(): Promise<Result<string>> {
        const { refreshTokenUrl } = this.props;
        try {
            return await ky
                .get(refreshTokenUrl, {
                    credentials: 'include',
                })
                .json()
                .then(response => this.getTokenFromResponse(response));
        } catch (e) {
            return Result.fail(new Error(`Cannot acquire a refreshed access token: ${e.message}`));
        }
    }

    /**
     * Extract, validate and return token from response
     * @todo improve validation and error reporting
     */
    private getTokenFromResponse(response: unknown): Result<string> {
        if (is.plainObject(response) && is.truthy(response.success) && is.nonEmptyString(response.token)) {
            return Result.ok(response.token);
        }
        return Result.fail(`Cannot extract token from response or invalid format.`);
    }
}
