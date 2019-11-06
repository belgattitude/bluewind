import { getValidatedDto } from '../../../core/mapper/dto-mapper';
import { IStudentService } from '../student.service';
import { setHttpErrors } from '../../../core/infra/http/error-utils';
import { ExpressHandler } from '../../../core/infra/http/express-handler';
import { injectable, inject } from 'tsyringe';

@injectable()
export class DeleteStudentHandler extends ExpressHandler {
    constructor(@inject('IStudentService') private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const studentId = parseInt(req.params.id, 10);
        res.send({ success: false, message: 'Not implemented' });
    }
}
