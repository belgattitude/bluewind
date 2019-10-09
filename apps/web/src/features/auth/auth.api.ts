import ky from 'ky';
import is from '@sindresorhus/is';
import { getTokenStore } from '../../core/token-store';

export type AuthRequestDTO = {
    username: string;
    password: string;
    rememberMe?: boolean;
};

export type AuthSuccessResponseDTO = {
    token: string;
};

export type AuthFailureResponseDTO = {
    message: string;
};

export type AuthResponseDTO = AuthSuccessResponseDTO | AuthFailureResponseDTO;

export type AuthUserDataResponseDTO = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

const defaultApiUrl = 'http://localhost:3000';

interface IAuthApi {
    login(authRequest: AuthRequestDTO): Promise<AuthSuccessResponseDTO>;
}

export class AuthApi implements IAuthApi {
    private api: typeof ky;

    constructor(apiUrl: string = defaultApiUrl) {
        this.api = ky.create({
            prefixUrl: apiUrl,
            throwHttpErrors: false,
        });
    }

    async login(authRequest: AuthRequestDTO): Promise<AuthSuccessResponseDTO> {
        return this.api
            .post('auth/login', {
                json: authRequest,
            })
            .json()
            .catch(reason => {
                throw new Error(`Error: could not connect: ${reason}`);
            })
            .then(response => {
                if (is.plainObject(response) && is.nonEmptyString(response.token)) {
                    return {
                        token: response.token,
                    };
                } else if (is.plainObject(response) && is.nonEmptyString(response.message)) {
                    throw new Error(`Invalid credentials`);
                }
                throw new Error(`Invalid response`);
            });
    }

    async getUserData(token: string): Promise<any> {
        return this.api
            .get('api/profile', {
                hooks: {
                    beforeRequest: [
                        (input, options) => {
                            const token = getTokenStore().getToken();
                            if (token) {
                                options.headers.set('Authorization', `Bearer ${token}`);
                            }
                        },
                    ],
                },
            })
            .json()
            .catch(reason => {
                throw new Error(`Error: could not connect: ${reason}`);
            })
            .then(response => {
                if (is.plainObject(response) && is.plainObject(response.value)) {
                    return response.value;
                }
                throw new Error(`Invalid response`);
            });

        /*
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    username: 'belgattitude',
                    firstName: 'Sébastien',
                    lastName: 'Vanvelthem',
                    email: 'belgattitude@gmail.com',
                });
            }, 2000);
        });
         */
    }

    async logout(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }
}

export const authApi = new AuthApi(defaultApiUrl);
