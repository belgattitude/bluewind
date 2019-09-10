import ky from 'ky';

export type AuthRequestDTO = {
    login: string;
    password: string;
    rememberMe?: boolean;
};

export type AuthSuccessResponseDTO = {
    token: string;
};

export type AuthUserDataResponseDTO = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

const defaultApiUrl = 'http://localhost:3000';

export class AuthApi {
    private api: typeof ky;

    constructor(apiUrl: string = defaultApiUrl) {
        this.api = ky.create({
            prefixUrl: apiUrl,
        });
    }

    async login(params: AuthRequestDTO): Promise<AuthSuccessResponseDTO> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (params.login === 'test') {
                    resolve({
                        token: 'ssssss',
                    });
                } else {
                    reject('Invalid login/passS');
                }
            }, 1000);
        });
    }

    async getUserData(token: string): Promise<AuthUserDataResponseDTO> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    username: 'belgattitude',
                    firstName: 'Sébastien',
                    lastName: 'Vanvelthem',
                    email: 'belgattitude@gmail.com',
                });
            }, 1000);
        });
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
