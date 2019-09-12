import { bool, cleanEnv, host, port, str } from 'envalid';

const dotEnvPath = __dirname + '/../.env';

const validators = {
    DEVSERVER_PORT: port({ default: 3000 }),
    TYPEORM_CONNECTION: str(),
    TYPEORM_HOST: host({ default: 'localhost' }),
    TYPEORM_PORT: port({ default: 3306 }),
    TYPEORM_USERNAME: str({ default: 'username' }),
    TYPEORM_PASSWORD: str({ default: 'password' }),
    TYPEORM_DATABASE: str(),
    TYPEORM_SYNCHRONIZE: bool({ default: true }),
    TYPEORM_LOGGING: bool({ default: true }),
    TYPEORM_ENTITIES: str(),
    TYPEORM_DRIVER_EXTRA: str({ default: '' }),
};

export const env = cleanEnv(process.env, validators, { strict: true, dotEnvPath });
