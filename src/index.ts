import express from 'express'
import { PORT } from './config'
import cookieParser from 'cookie-parser'
import { authMiddleware } from './auth'
import { loginMiddleware, logoutMiddleware, registerMiddleware, validateBody } from './middlewares'
import { Create, Login } from './dto'

const server = express()

server.use(express.json())
server.use(cookieParser())

server.get('/logout', logoutMiddleware)
server.post('/register', validateBody(Create), registerMiddleware)
server.post('/login', validateBody(Login), loginMiddleware)

server.use(authMiddleware)
server.get('/protected', (_, res) => res.sendFile(__dirname + '/public/index.html'))

server.listen(PORT, () => {
    console.log(`[SERVIDOR DE AUTENTICACION CORRIENDO EN ${PORT}]`)
})