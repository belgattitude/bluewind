import { AuthStatuses } from '../../../entity/user.entity';

export type Role = 'admin' | 'user';

export type User = {
    id: number;
    username: string;
    password: string;
    auth_status: AuthStatuses;
    roles: Role[]
}

