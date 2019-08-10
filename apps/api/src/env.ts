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
    TYPEORM_DRIVER_EXTRA?: string;
}>;

export const env: Env = cleanEnv(
    process.env,
    {
        TYPEORM_CONNECTION: str({ default: 'mysql' }),
        TYPEORM_HOST: str({ default: 'localhost' }),
        TYPEORM_PORT: num({ default: 3306 }),
        TYPEORM_USERNAME: str(),
        TYPEORM_PASSWORD: str(),
        TYPEORM_DATABASE: str(),
        TYPEORM_SYNCHRONIZE: bool({ default: true }),
        TYPEORM_LOGGING: bool({ default: true }),
        TYPEORM_ENTITIES: str(),
        TYPEORM_DRIVER_EXTRA: str(),
    },
    { strict: true, dotEnvPath: __dirname + '/../.env' },
);
