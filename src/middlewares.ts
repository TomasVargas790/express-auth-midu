import { RequestHandler } from "express";
import { UserCreate, UserLogin, validateZod } from "./dto";
import { UserRepository } from "./repository";
import { failed, success, successCreation, } from "./network";
import { createLog } from "./utils";
import { ZodSchema } from "zod";

export const registerMiddleware: RequestHandler = async (req, res) => {

    try {
        const newUser = req.body as UserCreate
        const id = await UserRepository.create(newUser);
        res.status(201).json(successCreation({ id }))
    } catch (ex) {
        createLog(ex)
        res.status(400).json(failed())
    }
}

export const loginMiddleware: RequestHandler = async (req, res) => {
    try {
        const user2Validate = req.body as UserLogin
        const accessToken = await UserRepository.login(user2Validate);
        const response = { access_token: accessToken }
        res.status(200)
            .cookie('access_token', accessToken, { httpOnly: true })
            .json(success(response))

    } catch (ex) {
        createLog(ex)
        res.status(400).json(failed())
    }
}

export const logoutMiddleware: RequestHandler = (_, res) => {
    res.clearCookie('access_token').status(200).json(success({ message: "successful logout" }))
}

export const validateBody = (schema: ZodSchema): RequestHandler => {
    return async (req, res, next) => {

        const { success, data: validatedData, error: errors } = await validateZod(schema, req.body)

        if ((!success || !validatedData) && errors) {
            createLog(errors)
            res.status(400).json(failed(errors))
            return
        }

        // Optionally store parsed data
        req.body = validatedData;
        next();
    };
}
