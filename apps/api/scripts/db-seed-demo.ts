import 'reflect-metadata';
import {Connection, createConnection} from 'typeorm';
import {UserEntity} from '../src/entity/user.entity';
import {StudentEntity} from "../src/entity/student.entity";
import {HashService} from "../src/core/infra/hash-service";
import * as faker from 'faker';

async function seedUserData(connection: Connection) {
    const hashService = new HashService();

    const users: (Partial<UserEntity> & {password: string})[] = [
        {username: 'admin', password: 'demo', first_name: 'Tom', last_name: 'Sayer', email: 'admin@bluewind.com'},
        {username: 'test', password: 'demo', first_name: 'Bill', last_name: 'Pilou', email: 'test@bluewind.com'}
    ];

    await Promise.all(users.map(async ({password, ...userData}) => {
        const { username } = userData;
        const user = await connection.manager.findOne(UserEntity, {
            where: {username: username},
        });
        if (user) {
            console.warn(`Skipped: user ${username} already exists in db.`);
        } else {
            const newUser = new UserEntity();
            Object.assign(newUser, {username, ...userData})
            newUser.password = await hashService.hashPassword(password);
            await connection.manager.save(newUser).catch(error => {
                console.error(error);
            });
            console.info(`Saved user '${username}' with id: ${newUser.id}`);
        }
    }));
}


async function seedStudentData(connection: Connection) {

    const students: Partial<StudentEntity>[] = [
        {first_name: 'Jo', last_name: 'Leblanc', email: 'test@example.com'},
        {first_name: 'Marie', last_name: 'Currie', email: 'marie@example.com'},
        {first_name: 'Jade', last_name: 'Auburn', email: 'jade@example.com'}
    ];

    // fake more students
    for (let i = 0; i < 100; i++) {
        //const gender = faker.name.gender;
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email(firstName, lastName);
        students.push({
            first_name: firstName,
            last_name: lastName,
            email: email,
            avatar_url: faker.internet.avatar(),
            birthdate: faker.date.past(),
        })
    }

    await Promise.all(students.map(async (studentData) => {
        const { email } = studentData;
        const student = await connection.manager.findOne(StudentEntity, {
            where: {email: email},
        });
        if (student) {
            console.warn(`Skipped: student ${email} already exists in db.`);
        } else {
            const newStudent = connection.manager.create(StudentEntity, studentData);
            await connection.manager.save(newStudent).catch(e => {
                console.error(e);
            });
            console.info(`Saved user '${email}' with id: ${newStudent.id}`);
        }
    }));
}


createConnection().then(async connection => {
    await seedUserData(connection);
    await seedStudentData(connection);
    connection.close();
}).catch(error => console.log(error));
