import {container} from "tsyringe";
import StudentService from "./features/student/student.service";

/**
 * Default container factory
 */
const getDefaultContainer = () => {
    container.register("IStudentService", {
        useClass: StudentService
    });
    return container;
}

export {getDefaultContainer};







