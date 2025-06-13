import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { failed } from "./network";

export const authMiddleware: RequestHandler = async (req, res, next) => {

    const token = req.cookies.access_token
    try {
        validateToken(token)
        next()
    } catch (ex) {
        res.status(400).json(failed(ex.message))
    }
}

function validateToken(token: string) {
    if (!token) {
        throw new Error('No token found!')
    }

    const isValid = verify(token, 'grandetuco1')
    if (!isValid) {
        throw new Error('Token not valid!')
    }
}   