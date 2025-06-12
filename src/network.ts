import z from "zod"
import { validateZod } from "./dto"
import { createLog } from "./utils"
import { Request, Response } from "express"

export const success = (payload?: object | Array<object>) => setResponse({ code: 200, message: 'SUCCESS REQUEST', payload })
export const successCreation = (payload?: object | Array<object>) => setResponse({ code: 201, message: 'SUCCESS CREATION', payload })
export const failed = (payload?: object | Array<object>) => setResponse({ code: 400, message: 'BAD REQUEST', payload })
export const unauthenticated = (payload?: object | Array<object>) => setResponse({ code: 401, message: 'UNAUTHENTICATED', payload })
export const unauthorized = (payload?: object | Array<object>) => setResponse({ code: 403, message: 'UNAUTHORIZED', payload })
export const notFound = (payload?: object | Array<object>) => setResponse({ code: 404, message: 'NOT FOUND', payload })
export const error = (payload?: object | Array<object>) => setResponse({ code: 500, message: 'INTERNAL SERVER ERROR', payload })

export const setResponse = ({ code, message, payload }: { code: number, message: string, payload?: object }) => ({
    code,
    message,
    payload: payload ?? {}
})

export const validateRequest = async <TZodType extends z.ZodTypeAny>(req: Request, res: Response, schema: TZodType) => {
    const { success, data: validatedData, error } = await validateZod(schema, req.body)
    if (!success) {
        createLog(error)
        res.status(400).json(failed(error))
    }
    return validatedData;
}