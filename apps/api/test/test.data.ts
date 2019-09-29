import {Connection} from 'typeorm';
import {hashSync} from 'bcryptjs';
import {StudentEntity} from '../src/entity/student.entity';
import {UserEntity} from '../src/entity/user.entity';

export async function seedUserData(connection: Connection) {
    const users = [
        {username: 'admin', password: 'demo', first_name: 'Tom', last_name: 'Sayer', email: 'admin@bluewind.com'},
        {username: 'test', password: 'demo', first_name: 'Bill', last_name: 'Pilou', email: 'test@bluewind.com'},
    ];

    await Promise.all(users.map(async (userData) => {
        const { username } = userData;
        const user = await connection.manager.findOne(UserEntity, {
            where: {username},
        });
        if (user) {
            console.warn(`Skipped: user ${username} already exists in db.`);
        } else {
            const newUser = new UserEntity();
            Object.assign(newUser, userData);
            newUser.password = hashSync(userData.password, 10);
            await connection.manager.save(newUser).catch(error => {
                console.error(error);
            });
        }
    }));
}

export async function seedStudentData(connection: Connection) {
    const students = [
        {first_name: 'Jo', last_name: 'Leblanc', email: 'test@example.com'},
        {first_name: 'Marie', last_name: 'Currie', email: 'marie@example.com'},
    ];

    await Promise.all(students.map(async (studentData) => {
        const { email } = studentData;
        const student = await connection.manager.findOne(StudentEntity, {
            where: {email},
        });
        if (student) {
            console.warn(`Skipped: student ${email} already exists in db.`);
        } else {
            const newStudent = connection.manager.create(StudentEntity, studentData);
            await connection.manager.save(newStudent).catch(e => {
                console.error(e);
            });
        }
    }));
}
