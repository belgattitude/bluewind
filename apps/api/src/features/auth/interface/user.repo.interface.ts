import {Result} from "../../../core/result";
import {User} from "./user.interface";

export interface IUserRepo {
    findByUsername(username: string): Promise<Result<User>>;
}
