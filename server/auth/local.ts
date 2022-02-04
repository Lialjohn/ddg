import { User } from '../db/models'
import express from "express"
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        const {name, password}: User = req.body
        let user = await User.findOne({ where: { name }})
        if (!user) {
            user = await User.create({name, password})
        }
        if (user && user.isPasswordCorrect(password)) {
            req.session.userID = user.id
            res.json(user)
        } else {
            res.send("no user found")
        }
    } catch (e) {
        next(e)
    }
})

router.post("/logout", async (req, res, next) => {
    try {
        delete req.session.userID
        req.session.destroy(e => {res.redirect('/login')}) 
    } catch (e) {
        next(e)
    }
})

export default router