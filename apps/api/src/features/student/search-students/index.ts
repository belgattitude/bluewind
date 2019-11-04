import { getValidatedDto } from '../../../core/mapper/dto-mapper';
import { IStudentService } from '../student.service';
import { setHttpErrors } from '../../../core/infra/http/error-utils';
import { ExpressHandler } from '../../../core/infra/http/express-handler';
import {injectable, inject} from "tsyringe";
import {SearchStudentDto} from "./search-student.dto";

@injectable()
export class SearchStudentsHandler extends ExpressHandler {
    constructor(@inject("IStudentService") private studentService: IStudentService) {
        super();
    }
    async executeImpl(): Promise<void> {
        const { req, res } = this;
        const { payload: dtoRs } = await getValidatedDto(SearchStudentDto, req.query);
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

