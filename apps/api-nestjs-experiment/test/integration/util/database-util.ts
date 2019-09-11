import * as sqlite3Import from 'sqlite3';
import {Database} from 'sqlite3';

const sqlite3 = sqlite3Import.verbose();

let db: Database;

export const createInMemoryDatabase = (): Promise<void> => {
    return new Promise((res, rej) => {
        db = new sqlite3.Database(':memory:', err => {
            if (err) {
                console.error('Could not setup in-memory database: ', err.message);
                rej(err);
            }
            res();
        });
    });
};

export const closeInMemoryDatabase = (): Promise<void> => {
    return new Promise((res, rej) => {
        db.close(err => {
            if (err) {
                console.error('Could not close in-memory database: ', err.message);
                rej(err);
            }
            res();
        });
    });
};
