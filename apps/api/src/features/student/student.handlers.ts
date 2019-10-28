import { Request, Response } from 'express';
import { getValidatedDto } from '../../core/mapper/dto-mapper';
import StudentService from './student.service';
import { StudentSearchRequestDto } from './student.dto';
import { setHttpErrors } from '../../core/http/error-utils';

export const searchStudents = (studentService: StudentService) => async (
    req: Request,
    res: Response
): Promise<void> => {
    // Get validated dto from query
    const { payload: dtoRs } = await getValidatedDto(StudentSearchRequestDto, req.query);
    if (dtoRs.isError) {
        return setHttpErrors(dtoRs.error, res);
    }

    // Return search results
    const { payload } = await studentService.search(dtoRs.value);

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
};

export const getStudent = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.id, 10);

    const studentService = new StudentService();
    try {
        const { payload } = await studentService.find(studentId);
        if (payload.isError) {
            return setHttpErrors(payload.error, res);
        }
        res.json({ success: true, data: payload.value });
    } catch (error) {
        // Error handling definitely needs more love
        res.send({ success: false, message: error.toString() });
    }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.id, 10);
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.id, 10);
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {};
