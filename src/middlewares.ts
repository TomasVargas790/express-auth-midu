import { RequestHandler } from "express";
import { Create, validateZod } from "./dto";
import { UserRepository } from "./repository";
import { failed, successCreation, } from "./network";
import { createLog } from "./utils";

export const registerMiddleware: RequestHandler = async (req, res, next) => {

    const { success, data: validatedData, error: errors } = await validateZod(Create, req.body)
    if (!success) {
        createLog(errors)
        res.status(400).json(failed(errors))
    }

    try {
        const id = await UserRepository.create(validatedData);
        res.status(201).json(successCreation({ id }))
        next()
    } catch (ex) {
        createLog(ex)
        res.status(400).json(failed())
    }

}
