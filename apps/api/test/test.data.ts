import {Connection} from 'typeorm';
import {hashSync} from 'bcryptjs';
import {StudentEntity} from '../src/entity/student.entity';
import {UserEntity} from '../src/entity/user.entity';

export async function seedUserData(connection: Connection) {
    const users = [
        {username: 'admin', password: 'demo', first_name: 'Tom', last_name: 'Sayer', email: 'admin@bluewind.com'},
        {username: 'test', password: 'demo', first_name: 'Bill', last_name: 'Pilou', email: 'test@bluewind.com'},
    ];

    await Promise.all(users.map(async ({username, password, email}) => {
        const user = await connection.manager.findOne(UserEntity, {
            where: {username},
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
            // console.debug(`Saved user '${username}' with id: ${newUser.id}`);
        }
    }));
}

export async function seedStudentData(connection: Connection) {
    const students = [
        {first_name: 'Jo', last_name: 'Leblanc', email: 'test@example.com'},
        {first_name: 'Marie', last_name: 'Currie', email: 'marie@example.com'},
    ];

    await Promise.all(students.map(async ({first_name, last_name, email}) => {
        const user = await connection.manager.findOne(StudentEntity, {
            where: {email},
        });
        if (user) {
            console.warn(`Skipped: user ${email} already exists in db.`);
        } else {
            const newStudent = new StudentEntity();
            newStudent.first_name = first_name;
            newStudent.last_name = last_name;
            newStudent.email    = email;

            await connection.manager.save(newStudent).catch(error => {
                console.error(error);
            });
            // console.debug(`Saved user '${firstName} ${lastName}' with id: ${newStudent.id}`);
        }
    }));
}
