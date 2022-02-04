import { User } from '../db/models'
import express, { NextFunction, Request, Response } from "express"
const router = express.Router()

router.post('/', async (req: Request, res, next) => {
    try {
        const user = await User.create(req.body)
        if (user) {
            req.session.userID = user.id
        }
        res.json(user)
    } catch(e) { next(e) }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.json(user)
    } catch (e) { next(e) }
})

router.get('/', async (req: Request, res, next) => {
    try {
        const allUsers = await User.findAll()
        // console.log(req.session.userID)
        res.json(allUsers)
    } catch(e) { next(e) }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) await user.destroy()
        res.status(204).send('deleted')
    } catch(e) { next(e) }
})

export default router