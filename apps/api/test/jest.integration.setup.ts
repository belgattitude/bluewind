import {
    Connection,
    createConnection,
    getConnection,
    getConnectionManager,
    getConnectionOptions,
    getRepository,
} from 'typeorm';
import {StudentEntity} from '../src/entity/student.entity';
import {UserEntity} from '../src/entity/user.entity';
import {hashSync} from 'bcryptjs';
import {seedStudentData, seedUserData} from './test.data';

async function initConnection(): Promise<Connection> {
    return await createConnection({
        type: 'sqlite',
        name: 'default',
        database: ':memory:',
        logging: false,
        entities: ['**/*.entity.ts'],
        synchronize: true,
    });
}

beforeAll(async () => {

    const connection = await initConnection().then((conn) => {
        console.debug('Connection ready');
        return conn;
    });

    await seedUserData(connection);
    await seedStudentData(connection);
    await getRepository(StudentEntity).find().then((result) => {
        //console.log('result', result);
    });
});

afterAll(async () => {
    // await getConnection().close();
});
