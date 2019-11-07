import ky from 'ky';
import is from '@sindresorhus/is';

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

export interface IAuthApi {
    login(authRequest: AuthRequestDTO): Promise<AuthSuccessResponseDTO>;
    logout(token?: string): Promise<boolean>;
}

export class AuthApi implements IAuthApi {
    private api: typeof ky;

    constructor(apiUrl: string = defaultApiUrl) {
        this.api = ky.create({
            prefixUrl: apiUrl,
            throwHttpErrors: false,
            credentials: 'include',
        });
    }

    /**
     * @throws Error on unsuccessful attempt
     */
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
                    throw new Error(`Invalid credentials ${response.message}`);
                }
                throw new Error(`Invalid response`);
            });
    }

    /**
     * Logout current user (currently does nothing)
     * @param token - optional access token if needed, 'refresh token' in session should do th job
     */
    async logout(token?: string): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 0);
        });
    }
}

export const authApi = new AuthApi(defaultApiUrl);
