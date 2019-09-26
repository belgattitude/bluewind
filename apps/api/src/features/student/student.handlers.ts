import { Request, Response } from 'express';
import { mapToDto } from '../../core/mapper/dto-mapper';
import StudentService from './student.service';
import { StudentSearchRequestDto } from './student.dto';

export const searchStudents = (studentService: StudentService) => async (
    req: Request,
    res: Response,
): Promise<void> => {

    const input = req.query;

    const { payload: payload1 } = await mapToDto(StudentSearchRequestDto, input);
    if (payload1.isError) {
        res.status(400).json(payload1.error.message);
        return;
    }
    const dto = payload1.value;

    try {
        const { payload } = await studentService.search(dto);
        if (payload.isError) {
            res.send({ success: false, message: payload.error.toString() });
            return;
        }
        res.json({ success: true, data: payload.value, dto });
    } catch (error) {
        // Error handling definitely needs more love
        res.send({ success: false, message: error.toString() });
    }
};

export const getStudent = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.id, 10);

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
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.id, 10);
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
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {};

export const createStudent = async (req: Request, res: Response): Promise<void> => {};
