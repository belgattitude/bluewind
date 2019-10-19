import { Request, Response, Router } from 'express';
import { DatabaseError } from '../../core/exceptions';
import { UserService } from './user.service';
import { UserRepo } from './user.repo';
import { assertIsSafeId } from '../../core/typeguards';

/**
 * Return user profile data
 */

type RequestWithUser = {
    userId?: number;
} & Request;

export const getProfileHandler = async (req: RequestWithUser, res: Response) => {
    const { userId } = req;
    if (!assertIsSafeId(userId)) {
        return res.status(401).json({ userId: req.userId });
    }

    const userService = new UserService(UserRepo.fromConnection());
    const result = await userService.getUserProfile(userId);

    const { payload } = result;

    if (payload.isError) {
        if (payload.error instanceof DatabaseError) {
            return res.status(500).send(payload.error.message);
        }
        return res.status(401).send(payload.error.message);
    }
    return res.json(payload);
};
