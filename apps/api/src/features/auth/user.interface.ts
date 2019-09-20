import { AuthStatuses } from '../../entity/user.entity';

export interface User {
    id: number;
    username: string;
    password: string;
    auth_status: AuthStatuses;
}
