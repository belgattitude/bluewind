import { getValidatedDto } from '../../../core/mapper/dto-mapper';
import { IStudentService } from '../student.service';
import { setHttpErrors } from '../../../core/infra/http/error-utils';
import { ExpressHandler } from '../../../core/infra/http/express-handler';
import {injectable, inject} from "tsyringe";

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
