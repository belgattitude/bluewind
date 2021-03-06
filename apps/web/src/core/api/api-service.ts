import ky from 'ky';
import { getTokenStore, ITokenStore } from '../token-store';
import { IRefreshTokenService, RefreshTokenService } from './refresh-token-service';
import { Result } from '@bluewind/error-flow';
import { isApiResponse } from '../typeguards';
import { runLogoutThunk } from '../../features/auth/auth.redux';
import { store } from '../../store';

type SearchParams = { [key: string]: string | number } | URLSearchParams;

export interface IApiService {
    get<T>(url: string, params?: SearchParams, signal?: AbortSignal): Promise<Result<T>>;
}

export interface IApiKyService {
    createKy(): typeof ky;
}

type ApiServiceProps = {
    serverUrl: string;
    refreshTokenService: IRefreshTokenService;
    tokenStore: ITokenStore;
    onAuthFailure: (response: Response) => Response;
};

export class ApiService implements IApiService, IApiKyService {
    private props: ApiServiceProps;
    private ky: typeof ky;

    constructor(props: ApiServiceProps) {
        this.props = props;
        this.ky = this.createKy();
    }

    get<T>(url: string, params?: SearchParams, signal?: AbortSignal): Promise<Result<T>> {
        const searchParams = params;
        return this.ky
            .get(url, {
                signal: signal,
                credentials: 'include',
                searchParams,
            })
            .json()
            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return Result.ok(response.data as T);
                }
                return Result.fail<T>(new Error(`Response is invalid or does not contain data`));
            })
            .catch(e => {
                if (signal && e.name === 'AbortError') {
                    return Result.fail(new Error(`Aborted`));
                }
                return Result.fail(new Error(`${e.name}: ${e.message}`));
            });
    }

    createKy(options?: { forceToken?: string }): typeof ky {
        const { forceToken } = options || {};
        return ky.create({
            prefixUrl: this.props.serverUrl,

            hooks: {
                beforeRequest: [
                    (request, options): void => {
                        const token = forceToken || this.props.tokenStore.getToken();
                        if (token) {
                            request.headers.set('Authorization', `Bearer ${token}`);
                        }
                    },
                ],

                afterResponse: [
                    async (request, options, response): Promise<Response> => {
                        const { status } = response;
                        if (status === 401 || status === 403) {
                            // attempt a refreshing token
                            const { refreshTokenService, tokenStore } = this.props;
                            const { payload } = await refreshTokenService.getAccessToken();
                            if (!payload.isError) {
                                const newToken = payload.value;
                                request.headers.set('Authorization', `Bearer ${newToken}`);
                                tokenStore.setToken(newToken);
                                // retry with the same
                                return ky(request, options);
                            } else {
                                // remove the token
                                tokenStore.removeToken();
                                return this.props.onAuthFailure(response);
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
        onAuthFailure: (response): Response => {
            store.dispatch(runLogoutThunk());
            return response;
        },
    });
};
