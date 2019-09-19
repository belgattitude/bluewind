export interface User {
    username: string;
    password: string;
    status: 'valid' | 'expired' | 'locked';
}
