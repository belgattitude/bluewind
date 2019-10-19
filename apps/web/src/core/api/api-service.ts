import ky from 'ky';
import { getTokenStore, ITokenStore } from '../token-store';
import { IRefreshTokenService, RefreshTokenService } from './refresh-token-service';
import { Result } from '@bluewind/error-flow';
import ownKeys = Reflect.ownKeys;

export interface IApiService {
    createKy(): typeof ky;
}

type ApiServiceProps = {
    serverUrl: string;
    refreshTokenService: IRefreshTokenService;
    tokenStore: ITokenStore;
    onAuthFailure: (response: Response) => void;
};

export class ApiService implements IApiService {
    private props: ApiServiceProps;

    constructor(props: ApiServiceProps) {
        this.props = props;
    }

    createKy(): typeof ky {
        return ky.create({
            prefixUrl: this.props.serverUrl,
            hooks: {
                beforeRequest: [
                    (input, options): void => {
                        const token = this.props.tokenStore.getToken();
                        if (token !== null) {
                            options.headers.set('Authorization', `Bearer ${token}`);
                        }
                    },
                ],
                afterResponse: [
                    async (input, options, response) => {
                        const { status } = response;
                        if (status === 401 || status === 403) {
                            // attempt a refreshing token
                            const { refreshTokenService, tokenStore } = this.props;
                            const { payload } = await refreshTokenService.getAccessToken();
                            if (!payload.isError) {
                                const newToken = payload.value;
                                options.headers.set('Authorization', `Bearer ${newToken}`);
                                tokenStore.setToken(newToken);
                                // retry with the same
                                return ky(input, options);
                            } else {
                                // remove the token
                                tokenStore.removeToken();
                                this.props.onAuthFailure(response);
                            }
                        }
                        return response;
                    },
                ],
            },
        });
    }
}

export const createDefaultApiService = () => {
    const serverUrl = 'http://localhost:3000';
    const tokenStore = getTokenStore();
    const refreshTokenService = new RefreshTokenService({
        tokenStore: tokenStore,
        refreshTokenUrl: `${serverUrl}/auth/refresh-token`,
    });
    return new ApiService({
        serverUrl,
        refreshTokenService: refreshTokenService,
        tokenStore: tokenStore,
        onAuthFailure: () => {
            window.location.reload();
        },
    });
};
