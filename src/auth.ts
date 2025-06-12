import { RequestHandler } from "express";

export const authMiddleware: RequestHandler = (req, res, next) => {

    //req.cookies.auth_token

    next()
}