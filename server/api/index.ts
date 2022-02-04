import express, { Request, Response, NextFunction } from "express"
import userRouter from './users'
const router = express.Router()

router.use('/users', userRouter)

router.use('*', (req: Request, res: Response, next) => {
    const error = new Error('Not Found')
    next(error)
})

export default router