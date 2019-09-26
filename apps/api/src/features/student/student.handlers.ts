import {NextFunction, Request, Response, Router} from 'express';
import { GenericDtoMapper } from '../../core/mapper/generic-dto-mapper';
import StudentService from './student.service';
import { addDTOErrorToResponse } from '../../core/utils';
import { StudentSearchRequestDto } from './student.dto';

export const searchStudents = async (req: Request, res: Response): Promise<void> => {
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
        const { payload } = await studentService.search(dto);
        if (payload.isError) {
            res.send({ success: false, message: payload.error.toString() });
            return;
        }
        res.json({ success: true, data: payload.value });
    } catch (error) {
        // Error handling definitely needs more love
        res.send({ success: false, message: error.toString() });
    }
};

export const getStudent = async (req: Request, res: Response): Promise<void> => {

    const studentId = parseInt(req.params.id);

    const studentService = new StudentService();
    try {
        const { payload } = await studentService.find(studentId);
        if (payload.isError) {
            res.send({ success: false, message: payload.error.toString() });
            return;
        }
        res.json({ success: true, data: payload.value });
    } catch (error) {
        // Error handling definitely needs more love
        res.send({ success: false, message: error.toString() });
    }
}

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.id);
    /*
    const studentService = new StudentService();
    try {
        const { payload } = await studentService.save();
        if (payload.isError) {
            res.send({ success: false, message: payload.error.toString() });
            return;
        }
        res.json({ success: true, data: payload.value });
    } catch (error) {
        // Error handling definitely needs more love
        res.send({ success: false, message: error.toString() });
    }
     */
}

export const deleteStudent = async(req: Request, res: Response): Promise<void> => {


}

export const createStudent = async(req: Request, res: Response): Promise<void> => {


}
