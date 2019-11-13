import { getValidatedDto } from '../../../core/mapper/dto-mapper';
import { IStudentService } from '../student.service';
import { setHttpErrors } from '../../../core/infra/http/error-utils';
import { ExpressHandler } from '../../../core/infra/http/express-handler';
import { injectable, inject } from 'tsyringe';
import { UpdateStudentDto } from './update-student.dto';

@injectable()
export class UpdateStudentHandler extends ExpressHandler {
    constructor(@inject('IStudentService') private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const studentId = parseInt(req.params.id, 10);
        const { payload: dtoRs } = await getValidatedDto(UpdateStudentDto, req.body);
        if (dtoRs.isError) {
            return setHttpErrors(dtoRs.error, res);
        }
        // Return search results
        const { payload } = await this.studentService.update(studentId, dtoRs.value);

        if (payload.isError) {
            res.send({ success: false, message: `Cannot update student ${studentId}: ${payload.error.message}` });
            return;
        }
        res.send({ success: true, data: payload.value });
    }
}
