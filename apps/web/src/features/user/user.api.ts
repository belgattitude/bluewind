import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import is from '@sindresorhus/is';
import ky from 'ky';
import { classesListMock } from '../../mocks/datamocks';
import { isApiResponse } from '../../core/typeguards';
import { Result } from '@bluewind/error-flow';
import { createDefaultApiService, IApiService } from '../../core/api/api-service';

export interface UserDetailDTO {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
    email: string;
    phone: string;
    facebook_url: string;
    created_at: string;
    updated_at: string;
    pastClasses: typeof classesListMock;
}

export type UserListDTO = UserDetailDTO[];

type SearchParams = {
    query?: string;
};

export class UserApi {
    private api: typeof ky;

    constructor(apiService: IApiService) {
        this.api = apiService.createKy();
    }

    async getProfile(token: string): Promise<UserDetailDTO> {
        return this.api
            .get(`api/profile/${UserId}`)
            .json()
            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return response.data as UserDetailDTO;
                }
                throw new Error('Response is invalid or does not contain data');
            });
    }

    async save<T>(User: {} & T): Promise<UserDetailDTO> {
        console.log('save User', User);

        return this.api
            .post(`api/Users`, {
                json: snakecaseKeys(User),
            })
            .json()
            .then(response => {
                if (is.plainObject(response)) {
                    const data = camelcaseKeys(response, { deep: true });
                    return (data as unknown) as UserDetailDTO;
                }
                throw new Error(`Invalid response`);
            });
    }
}

export const getUserApi = () => new UserApi(createDefaultApiService());
