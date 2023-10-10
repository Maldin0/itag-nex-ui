import {IDatabase} from "pg-promise";

const pgPromise = require('pg-promise');

export default class DBConnection {
    private static instance: DBConnection;
    private db: IDatabase<unknown>;

    private constructor() {
        this.db = new pgPromise()({
            host: '161.246.127.24',
            port: 9077,
            database: 'dbitag',
            user: 'clmtbmrw30079bsmnfdwi4ovp',
            password: 'YcVOt4I2p6X3YTDXNltyKgxN'
        });
    }

    public static getInstance() {
        if (!DBConnection.instance) {
            DBConnection.instance = new DBConnection();
        }
        return DBConnection.instance;
    }

    public getDB() {
        return this.db;
    }
}