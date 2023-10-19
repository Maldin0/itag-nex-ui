import pgPromise, { IDatabase } from 'pg-promise';

const pgp = pgPromise();

const connectionDetails = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
};

const db: IDatabase<any> = pgp(connectionDetails);

export default db;
