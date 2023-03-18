import express from 'express'

import 'express-async-errors'
import 'express-validator'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { handleError } from './middleware/error-handling'
const app = express()
app.set("trust proxy", true)

import { currentUser } from './routes/current-user'
import { login } from './routes/login'
import { signup } from './routes/signup'
import { logout } from './routes/logout'
import { NotFoundError } from './errors/NotFoundError'
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: false,
}))

app.use(signup)
app.use(login)
app.use(logout)
app.use(currentUser)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(handleError)

export { app }
