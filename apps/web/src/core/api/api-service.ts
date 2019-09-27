import ky from 'ky';
import { getTokenStore, ITokenStore } from '../token-store';

const createApiService = (tokenStore: ITokenStore, apiUrl: string) => (
    onAuthenticationFailure?: () => {}
): typeof ky => {
    return ky.create({
        prefixUrl: apiUrl,
        // Debug for headers, can also transform the response
        hooks: {
            beforeRequest: [
                // Set the token if any
                (input, options) => {
                    const token = getTokenStore().getToken();
                    if (token !== null) {
                        options.headers.set('Authorization', `Bearer ${token}`);
                    }
                },
            ],
            beforeRetry: [
                // Let's attempt to refresh the token
                async (input, options, errors, retryCount) => {
                    const token = getTokenStore().getToken();
                    if (token) {
                        // Based on cookie refresh token (same domain policy !!!)
                        const refreshedToken = await ky
                            .get(`${apiUrl}/auth/refresh-token`)
                            .text()
                            .then(result => {
                                return result;
                            });
                        tokenStore.setToken(refreshedToken);
                        options.headers.set('Authorization', `Bearer ${token}`);
                    }
                },
            ],
            afterResponse: [
                (input, options, response) => {
                    if (response.status === 401) {
                        // This should do the trick
                        getTokenStore().removeToken();
                        window.location.reload();
                    }
                    response.headers.forEach((val, key) => {
                        console.log(key, val);
                    });
                },
            ],
        },
    });
};

const defaultApiUrl = 'http://localhost:3000/api';
export const apiService = createApiService(getTokenStore(), defaultApiUrl);
