import { Request, Response, Router } from 'express';
import { GenericDtoMapper } from '../../core/mapper/generic-dto-mapper';
import StudentService from './student.service';
import { addDTOErrorToResponse } from '../../core/utils';
import { StudentSearchRequestDto } from './student.dto';

export const searchStudents = async (req: Request, res: Response) => {
    // Get a validated LoginRequestDTO from express request
    // Could be handled differently... just an example using
    // discriminated unions type safety to handle validation.

    const dtoOrError = await GenericDtoMapper.fromRequest(StudentSearchRequestDto, req);
    if (dtoOrError.type === 'failure') {
        addDTOErrorToResponse(res, dtoOrError).send();
        return;
    }

    const dto = dtoOrError.dto;

    // Get the quote service
    // Should be injected using di, refactor action to class and inject in constructor
    // or use type-di...

    const studentService = new StudentService();

    try {
        const result = await studentService.search(dto);
        res.json({ success: true, result });
    } catch (error) {
        // Error handling definitely needs more love
        res.send({ success: false, message: error.toString() });
    }
};
