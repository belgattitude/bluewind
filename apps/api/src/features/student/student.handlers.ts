import { getValidatedDto } from '../../core/mapper/dto-mapper';
import { IStudentService } from './student.service';
import { StudentSearchRequestDto } from './student.dto';
import { setHttpErrors } from '../../core/infra/http/error-utils';
import { ExpressHandler } from '../../core/infra/http/express-handler';
import {injectable, inject} from "tsyringe";

@injectable()
export class SearchStudentsHandler extends ExpressHandler {
    constructor(@inject("IStudentService") private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const { payload: dtoRs } = await getValidatedDto(StudentSearchRequestDto, req.query);
        if (dtoRs.isError) {
            return setHttpErrors(dtoRs.error, res);
        }
        // Return search results
        const { payload } = await this.studentService.search(dtoRs.value);

        /*
        const { payload } = await new Promise(resolve => {
            setTimeout(() => {
                resolve(studentService.search(dtoRs.value));
            }, 2000);
        });
        */
        if (payload.isError) {
            return setHttpErrors(payload.error, res);
        }
        res.json({ success: true, data: payload.value, dtoRs });
    }
}

@injectable()
export class GetStudentHandler extends ExpressHandler {
    constructor(@inject("IStudentService") private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const studentId = parseInt(req.params.id, 10);
        const { payload } = await this.studentService.find(studentId);
        if (payload.isError) {
            return setHttpErrors(payload.error, res);
        }
        res.json({ success: true, data: payload.value });
    }
}

@injectable()
export class UpdateStudentHandler extends ExpressHandler {
    constructor(@inject("IStudentService") private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const studentId = parseInt(req.params.id, 10);
        res.send({ success: false, message: 'Not implemented' });
    }
}

@injectable()
export class DeleteStudentHandler extends ExpressHandler {
    constructor(@inject("IStudentService") private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const studentId = parseInt(req.params.id, 10);
        res.send({ success: false, message: 'Not implemented' });
    }
}

@injectable()
export class CreateStudentHandler extends ExpressHandler {
    constructor(@inject("IStudentService") private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        res.send({ success: false, message: 'Not implemented' });
    }
}
