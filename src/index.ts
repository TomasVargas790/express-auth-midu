import express from 'express'
import { PORT } from './config'
import cookieParser from 'cookie-parser'
import { authMiddleware } from './auth'
import { registerMiddleware } from './middlewares'

const server = express()

server.use(express.json())
server.use(cookieParser())
server.use(authMiddleware)

server.post('/register', registerMiddleware)

/* server.post('/login') */
/* server.post('/logout') */
/* server.post('/protected') */

server.listen(PORT, () => {
    console.log(`[SERVIDOR DE AUTENTICACION CORRIENDO EN ${PORT}]`)
})