import { getValidatedDto } from '../../../core/mapper/dto-mapper';
import { IStudentService } from '../student.service';
import { setHttpErrors } from '../../../core/infra/http/error-utils';
import { ExpressHandler } from '../../../core/infra/http/express-handler';
import { injectable, inject } from 'tsyringe';

@injectable()
export class GetStudentHandler extends ExpressHandler {
    constructor(@inject('IStudentService') private studentService: IStudentService) {
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
