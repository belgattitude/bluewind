import 'reflect-metadata';
import {Connection, createConnection, Entity} from 'typeorm';
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
        {username: 'admin', password: 'demo', firstName: 'Tom', lastName: 'Sayer', email: 'admin@bluewind.com'},
        {username: 'test', password: 'demo', firstName: 'Bill', lastName: 'Pilou', email: 'test@bluewind.com'}
    ];

    await Promise.all(users.map(async ({username, password, email}) => {
        const user = await connection.manager.findOne(UserEntity, {
            where: {username: username},
        });
        if (user) {
            console.warn(`Skipped: user ${username} already exists in db.`);
        } else {
            const newUser = new UserEntity();
            newUser.username = username;
            newUser.password = hashSync(password, 10);
            newUser.email    = email;
            await connection.manager.save(newUser).catch(error => {
                console.error(error);
            });
            console.info(`Saved user '${username}' with id: ${newUser.id}`);
        }
    }));
}


async function seedStudentData(connection: Connection) {
    const students = [
        {firstName: 'Jo', lastName: 'Leblanc', email: 'test@example.com'},
        {firstName: 'Marie', lastName: 'Currie', email: 'marie@example.com'}
    ];

    await Promise.all(students.map(async ({firstName, lastName, email}) => {
        const user = await connection.manager.findOne(StudentEntity, {
            where: {email: email},
        });
        if (user) {
            console.warn(`Skipped: user ${email} already exists in db.`);
        } else {
            const newStudent = new StudentEntity();
            newStudent.firstName = firstName;
            newStudent.lastName = lastName;
            newStudent.email    = email;

            await connection.manager.save(newStudent).catch(error => {
                console.error(error);
            });

            console.info(`Saved user '${firstName} ${lastName}' with id: ${newStudent.id}`);
        }
    }));
}
