import {createDefaultApiService, IApiService} from '../../core/api/api-service';
import {Result} from "@bluewind/error-flow";

type ProfileData = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export interface IProfileApi {
    getProfileData(): Promise<Result<ProfileData>>;
}


export class ProfileApi implements IProfileApi {

    constructor(private api: IApiService) {
    }

    /**
     * Return current user profile based on active access/refresh token
     */
    async getProfileData(): Promise<Result<ProfileData>> {
        return this.api.get<ProfileData>('api/profile');
    }

}

export const getDefaultProfileApi = () => new ProfileApi(createDefaultApiService());

