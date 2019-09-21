import { Request, Response } from 'express';
import {GenericDtoMapper} from "../../core/mapper/generic-dto-mapper";
import {addDTOErrorToResponse} from "../../core/utils";
import {DatabaseError} from "../../core/exceptions";
import {GetProfileDto} from "./user.dto";
import {UserService} from "./user.service";
import {UserRepo} from "./user.repo";

/**
 * Return user profile data
 */

export const getProfileHandler = async (req: Request, res: Response) => {
    // Validate input
    const dtoOrError = await GenericDtoMapper.fromRequest(GetProfileDto, req);
    if (dtoOrError.type === 'failure') {
        addDTOErrorToResponse(res, dtoOrError).send();
        return;
    }

    const userService = new UserService(UserRepo.fromConnection());
    const result = await userService.getUserProfile(dtoOrError.dto.user_id)

    const { payload } = result;

    if (payload.isError) {
        if (payload.error instanceof DatabaseError) {
            return res.status(500).send(payload.error.message);
        }
        return res.status(401).send(payload.error.message);
    }
    return res.json(payload);
};
