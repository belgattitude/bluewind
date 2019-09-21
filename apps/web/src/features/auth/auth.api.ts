import ky from 'ky';
import {StudentListDTO} from "../student/student.api";
import is from "@sindresorhus/is";

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

interface IAuthApi {};

export class AuthApi implements IAuthApi {
    private api: typeof ky;

    constructor(apiUrl: string = defaultApiUrl) {
        this.api = ky.create({
            prefixUrl: apiUrl,
        });
    }

    async login(authRequest: AuthRequestDTO): Promise<AuthSuccessResponseDTO> {
        return this.api
            .post('auth/login', {
                json: authRequest
            })
            .json()
            .then((response) : AuthSuccessResponseDTO => {
                if (is.plainObject(response) && is.nonEmptyString(response.token)) {
                    return {
                        token: response.token
                    }
                } else {
                    throw new Error(`Response did not respond with a valid token`);
                }
                throw new Error(`Invalid response`)
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
            }, 2000);
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
