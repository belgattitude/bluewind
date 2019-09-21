import {Result} from "../../../core/result";
import {AuthUser} from "./auth-user.interface";

export interface IAuthRepo {
    findByUsername(username: string): Promise<Result<AuthUser>>;
}
