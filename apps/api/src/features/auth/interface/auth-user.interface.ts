import { AuthStatuses } from '../../../entity/user.entity';
import {AuthRole} from "./auth-role.inteface";

export type AuthUser = {
    id: number;
    username: string;
    password: string;
    auth_status: AuthStatuses;
    roles: AuthRole[]
}

