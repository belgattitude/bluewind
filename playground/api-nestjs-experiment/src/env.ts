import { bool, cleanEnv, num, str } from 'envalid';

export type Env = Readonly<{
    TYPEORM_CONNECTION: string;
    TYPEORM_HOST: string;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_PORT: number;
    TYPEORM_SYNCHRONIZE: boolean;
    TYPEORM_LOGGING: boolean;
    TYPEORM_ENTITIES: string;
    TYPEORM_DRIVER_EXTRA?: string | null;
}>;

export const env: Env = cleanEnv(
    process.env,
    {
        TYPEORM_CONNECTION: str({ default: 'mysql' }),
        TYPEORM_HOST: str({ default: 'localhost' }),
        TYPEORM_PORT: num({ default: 3306 }),
        TYPEORM_USERNAME: str({ devDefault: 'username' }),
        TYPEORM_PASSWORD: str({ devDefault: 'password' }),
        TYPEORM_DATABASE: str({ devDefault: 'database' }),
        TYPEORM_SYNCHRONIZE: bool({ default: true }),
        TYPEORM_LOGGING: bool({ default: true }),
        TYPEORM_ENTITIES: str(),
        TYPEORM_DRIVER_EXTRA: str( { default: '{"charset": "utf8mb4"}'}),
    },
    { strict: true, dotEnvPath: __dirname + '/../.env' },
);
