type EnvConfig = {
    PORT: number;
    NODE_ENVIRONMENT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: number;
    DB_TYPE: 'postgres' | 'mariadb' | 'mysql';
    HASH_SALT: number
};

export const {
    PORT = '3000',
    NODE_ENVIRONMENT = 'development',
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_TYPE,
    HASH_SALT
} = process.env as unknown as EnvConfig

