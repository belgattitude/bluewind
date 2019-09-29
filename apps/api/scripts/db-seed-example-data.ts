import 'reflect-metadata';
import {Connection, createConnection} from 'typeorm';
import {UserEntity} from '../src/entity/user.entity';
import { hashSync} from 'bcryptjs';
import {StudentEntity} from "../src/entity/student.entity";

createConnection().then(async connection => {
    await seedUserData(connection);
    await seedStudentData(connection);
    connection.close();
}).catch(error => console.log(error));


async function seedUserData(connection: Connection) {
    const users = [
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
            newUser.password = hashSync(password, 10);
            await connection.manager.save(newUser).catch(error => {
                console.error(error);
            });
            console.info(`Saved user '${username}' with id: ${newUser.id}`);
        }
    }));
}


async function seedStudentData(connection: Connection) {
    const students = [
        {first_name: 'Jo', last_name: 'Leblanc', email: 'test@example.com'},
        {first_name: 'Marie', last_name: 'Currie', email: 'marie@example.com'},
        {first_name: 'Jade', last_name: 'Auburn', email: 'jade@example.com'}
    ];

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
