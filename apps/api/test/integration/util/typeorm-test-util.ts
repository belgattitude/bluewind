import { createConnection } from 'typeorm';
import { StudentEntity } from '../../../src/entity/student.entity';

export const createConnectionForInMemorySQLiteDatabase = async () => {
    return createConnection({
        type: 'sqlite',
        name: 'memory',
        database: ':memory:',
        entities: [StudentEntity],
        synchronize: true,
    });
};
