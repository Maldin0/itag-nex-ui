import pgPromise, { IDatabase } from 'pg-promise';

class Database {
    private static instance: IDatabase<any>;

    private constructor() {}

    public static getInstance(): IDatabase<any> {
        if (!Database.instance) {
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

            Database.instance = pgp(connectionDetails);
        }

        return Database.instance;
    }
}

export default Database;
