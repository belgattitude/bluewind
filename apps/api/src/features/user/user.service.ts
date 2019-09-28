import {Result} from "@bluewind/error-flow";
import { UserProfile } from './interface';
import { UserRepo } from './user.repo';

export class UserService {
    constructor(private userRepo: UserRepo) {
        this.userRepo = userRepo;
    }
    async getUserProfile(userId: number): Promise<Result<UserProfile>> {
        return this.userRepo.getProfile(userId).then(async result => {
            const { payload } = result;
            // Narrowed to error
            if (payload.isError) {
                return result;
            }
            return Result.ok<UserProfile>(payload.value);
        });
    }
}
